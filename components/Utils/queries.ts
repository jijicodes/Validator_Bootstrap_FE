import { cosmos } from "osmojs";
import { PageRequest } from "./protos/cosmos/base/query/v1beta1/pagination";
import { Validator } from "osmojs/dist/codegen/tendermint/abci/types";
import {
  RedelegationResp,
  RedelegationResponse,
  isQueryError,
} from "./redelegations";
import { coin } from "@cosmjs/launchpad";
import parseISO from "date-fns/parseISO";
import {
  AuthorizationType,
  StakeAuthorization,
} from "osmojs/dist/codegen/cosmos/staking/v1beta1/authz";
import { GrantAuthorization } from "osmojs/dist/codegen/cosmos/authz/v1beta1/authz";

import { Coin } from "@cosmjs/stargate";

const fetchRedelegations = (rest: string, delegatorAddress: string) => () =>
  fetch(
    `${rest}/cosmos/staking/v1beta1/delegators/${delegatorAddress}/redelegations?pagination.limit=50`
  )
    .then((resp) => resp.json())
    .then(
      (
        data: RedelegationResp
      ):
        | undefined
        | {
            list: RedelegationResponse[];
            record: Record<string, string>;
          } => {
        console.log("fetching redelegation records for " + rest, data);
        return isQueryError(data)
          ? undefined
          : {
              list: data.redelegation_responses,
              record: Object.fromEntries(
                data.redelegation_responses
                  .flatMap(
                    ({ entries, redelegation: { validator_dst_address } }) =>
                      entries.map(
                        ({
                          redelegation_entry: { completion_time },
                        }): [
                          validatorAddress: string,
                          completionTime: string
                        ] => [validator_dst_address, completion_time]
                      )
                  )
                  .sort(
                    ([_, aTime], [__, bTime]) =>
                      parseISO(aTime).getTime() - parseISO(bTime).getTime()
                  )
              ),
            };
      }
    );

const userGrant = async (
  client: Awaited<ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>>,
  delegatorAddress: string,
  granteeAddress: string
) => {
  const {
    grants: [grant],
  } = await client.cosmos.authz.v1beta1.grants({
    granter: delegatorAddress,
    grantee: granteeAddress,
    msgTypeUrl: "/cosmos.staking.v1beta1.StakeAuthorization",
    pagination: PageRequest.fromPartial({}),
  });

  if (
    grant &&
    grant.authorization &&
    grant.authorization.$typeUrl ===
      "/cosmos.staking.v1beta1.StakeAuthorization" &&
    (grant.authorization.authorizationType ===
      AuthorizationType.AUTHORIZATION_TYPE_DELEGATE ||
      grant.authorization.authorizationType ===
        AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE)
  ) {
    return grant;
  }
  return undefined;
};

const queryAvailableUserFunds = async (
  client: Awaited<ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>>,
  rest: string,
  stakingDenom: string,
  grantee: string
) =>
  client.cosmos.authz.v1beta1
    .granteeGrants({
      grantee,

      pagination: PageRequest.fromPartial({}),
    })
    .then(({ grants }) =>
      Promise.all(
        grants

          .filter(({ authorization }) => isStakeAuthorization(authorization))
          .map(
            ({
              granter,
              authorization,
            }): [granter: string, authorization: StakeAuthorization] => [
              granter,
              authorization as StakeAuthorization,
            ]
          )
          .map(([granter, authorization]) =>
            (authorization.authorizationType ===
            AuthorizationType.AUTHORIZATION_TYPE_DELEGATE
              ? existingBalances(granter, client, stakingDenom)
              : movableDelegations(granter, client, rest).then(
                  (movable) => movable?.total
                )
            ).then(
              (
                availableFunds
              ): [
                granter: string,
                availableFunds: Coin | undefined,
                authorization: StakeAuthorization
              ] => [granter, availableFunds, authorization]
            )
          )
      ).then((grants) =>
        grants.filter(([_, availableFunds]) => !!availableFunds)
      )
    );

const isStakeAuthorization = (
  authorization: GrantAuthorization["authorization"]
  // @ts-ignore
): authorization is StakeAuthorization =>
  !!(
    authorization &&
    authorization.$typeUrl === "/cosmos.staking.v1beta1.StakeAuthorization" &&
    (authorization.authorizationType ===
      AuthorizationType.AUTHORIZATION_TYPE_DELEGATE ||
      authorization.authorizationType ===
        AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE)
  );

/**
 * Queries the "Movable" delegations for the user.
 * That is the delegations that are able to be redelegated
 * @param address string
 * @param client queryClient
 */
const movableDelegations = async (
  address: string,
  client: Awaited<ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>>,
  rest: string
) => {
  const [{ delegationResponses: delegations }, redelegations] =
    await Promise.all([
      client.cosmos.staking.v1beta1.delegatorDelegations({
        delegatorAddr: address,
        pagination: PageRequest.fromPartial({}),
      }),

      fetchRedelegations(rest, address)(),
    ]);

  if (redelegations) {
    const redels = redelegations.record;

    const valid = delegations.filter(
      (del) => !redels[del.delegation.validatorAddress]
    );
    const total = valid
      .map(({ balance }) => balance)
      .reduce((a, b) => coin(Number(a.amount) + Number(b.amount), a.denom));

    return { total, delegations: valid };
  }
  return undefined;
};

const existingBalances = async (
  address: string,
  client: Awaited<ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>>,
  stakingDenom: string
) => {
  return client.cosmos.bank.v1beta1
    .balance({
      address,
      denom: stakingDenom,
    })
    .then(({ balance }) => balance);
};

const getValidatorDelegationsByPosition = async (
  client: Awaited<ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>>,
  position: number
) => {
  const vals = await getValidators(client, position);
  return vals.at(position - 1)?.power;
};

const getValidators = (
  client: Awaited<ReturnType<typeof cosmos.ClientFactory.createRPCQueryClient>>,
  limit: number,
  key?: Uint8Array
): Promise<Validator[]> =>
  client.cosmos.staking.v1beta1
    .validators({
      status: "1",

      pagination: PageRequest.fromPartial({
        limit: Math.min(limit, 50),
        key,
        countTotal: true,
      }),
    })
    .then(
      async ({ validators, pagination }): Promise<Validator[]> =>
        [
          ...validators,
          ...(pagination.nextKey &&
          // may need to compare to pagination.total as well here
          validators.length < limit
            ? await getValidators(
                client,
                limit - Math.min(limit, 50),
                pagination.nextKey
              )
            : []),
        ] as Validator[]
    )
    .then((vs) => vs.sort((a, b) => Number((a.power - b.power).toString())));
