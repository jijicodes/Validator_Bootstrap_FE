import {
  Box,
  Text,
  Image,
  Button,
  NameValueList,
  NameValuePair,
} from "grommet";
import Link from "next/link";
import { useRouter } from "next/router";
import { Chain } from "../../../components/Chain/Chain";
import { campaignsInfo } from "../../../utils/campaignsInfo";
import { chains } from "../../../utils/chains";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { ValidatorName } from "../../../components/ValidatorName/ValidatorName";
import { P, match } from "ts-pattern";
import { assets, chains as registryChains } from "chain-registry";

export default function Page() {
  const router = useRouter();
  const selectedCampaign = campaignsInfo.find(
    (p) => p.campaign_addr === router.query.campaignContractAddress
  );
  const chainId = chains[selectedCampaign?.connection_id]?.chainId;
  const endDate =
    selectedCampaign &&
    selectedCampaign.campaignStatus.campaign_info.expiration;
  //2024-10-30T14:48:00.000Z
  const expiresIn = endDate && formatDistanceToNow(parseISO(endDate));

  const validatorAddress =
    selectedCampaign?.campaignStatus.campaign_info.validator_address;

  const [validatorInfo, setValidatorInfo] = useState({});
  useEffect(() => {
    fetch(`https://validators-api.herokuapp.com/validator/${validatorAddress}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setValidatorInfo(data);
      });
  }, [validatorAddress]);

  if (!selectedCampaign) return <Box>None</Box>;

  const totalAmountPledged = selectedCampaign?.pledges.reduce(
    (a, b) => a + Number(b?.amount),
    0
  );

  const rewardsRemainingDays =
    selectedCampaign.campaignStatus.state.RewardsDistribution
      ?.disbursements_remaining;

  const remainingRewardsFirst =
    selectedCampaign.campaignStatus.reward_tokens[0].amount;

  const remainingRewardsSecond =
    selectedCampaign.campaignStatus.state.RewardsDistribution
      ?.total_distributed[0].amount;

  const state = selectedCampaign?.campaignStatus?.state;

  const reward_tokens = selectedCampaign?.campaignStatus?.reward_tokens;
  const chainInfo = registryChains.find(({ chain_id }) => chain_id === chainId);
  const chainAssets = assets.find(
    ({ chain_name }) => chain_name === chainInfo?.chain_name
  );

  const rewardsDistributingSteate =
    typeof state !== "string" && "RewardsDistribution" in state;
  // {router.query.campaignContractAddress}
  return (
    <Box pad={{ horizontal: "5vw" }}>
      <Box pad={"medium"}>
        <Button hoverIndicator as={Link} href="/campaigns" label="Back" />
      </Box>
      <Box align="center" gap="large">
        <Box gap="small" pad="small">
          <ValidatorName
            borderRadius="25%"
            chainId={chainId}
            valoperAddress={validatorAddress}
          />
          <Text>{validatorInfo?.validator?.description?.details}</Text>
        </Box>
        <Box>
          <NameValueList>
            <NameValuePair name="State">
              <Text>
                {match(state)
                  .with("Active", () => "Active")
                  .with("Delegating", () => "Delegating")
                  .with(
                    { PendingStart: P._ },
                    (state) => `Pending Start -${state.PendingStart}`
                  )
                  .with(
                    { RewardsDistribution: P._ },
                    (state) => `Rewards Distributing`
                  )
                  .with({ Ended: "RewardsCompleted" }, () => "Complete")
                  .with({ Ended: P._ }, ({ Ended }) => Ended)
                  .exhaustive()}
              </Text>
            </NameValuePair>
            <NameValuePair name="Chain">
              <Chain chain={chainId} />
            </NameValuePair>{" "}
            <NameValuePair name="Target Goal">
              <Text>{selectedCampaign?.target_position}</Text>
            </NameValuePair>{" "}
            <NameValuePair name="Current Rank">
              <Text>{validatorInfo?.validator?.ranking}</Text>
            </NameValuePair>
            <NameValuePair name="Number of Pledges">
              <Text>{selectedCampaign?.pledges.length}</Text>
            </NameValuePair>
            <NameValuePair name="Rewards Token">
              <>
                {reward_tokens.map(({ amount, denom }) => {
                  const assetInfo = chainAssets?.assets.find(
                    (asset) => asset.base === denom
                  );
                  return assetInfo ? (
                    <Box
                      direction="row"
                      gap="xsmall"
                      key={assetInfo.base}
                      align="center"
                    >
                      <Image
                        height="25px"
                        width="25px"
                        src={
                          assetInfo.logo_URIs?.jpeg ||
                          assetInfo.logo_URIs?.png ||
                          assetInfo.logo_URIs?.svg
                        }
                        alt={`${assetInfo.symbol} icon`}
                      />
                      <Text>
                        {Number(amount) /
                          10 **
                            assetInfo.denom_units
                              .map(({ exponent }) => exponent)
                              .reduce((a, b) => Math.max(a, b), -Infinity)}
                      </Text>
                      <Text>{assetInfo.symbol}</Text>
                    </Box>
                  ) : (
                    <Box direction="row" gap="xsmall" key={denom}>
                      <Text>{Number(amount)}</Text>
                      <Text>
                        {denom.slice(0, 8)}..
                        {denom.slice(denom.length - 5)}
                      </Text>
                    </Box>
                  );
                })}
              </>
            </NameValuePair>
            <NameValuePair name="Time Left">
              <Text>{`${expiresIn?.slice(0, 1).toUpperCase()}${expiresIn?.slice(
                1
              )}`}</Text>
            </NameValuePair>
            <NameValuePair name="Total Amount Pledged">
              <Text>{totalAmountPledged}</Text>
            </NameValuePair>
            <NameValuePair name="Completed">
              <Text>{"20%"}</Text>
            </NameValuePair>
            {rewardsDistributingSteate && (
              <>
                <NameValuePair name="Rewards Remaining Days">
                  <Text>{rewardsRemainingDays}</Text>
                </NameValuePair>
                <NameValuePair name="Remaining Rewards">
                  <Text>{remainingRewardsFirst - remainingRewardsSecond}</Text>
                </NameValuePair>
              </>
            )}
          </NameValueList>
        </Box>
        {state === "Active" ? (
          <Box
            border
            justify="center"
            pad="small"
            align="center"
            direction="row"
            gap="small"
          >
            <Button
              as={Link}
              style={{ borderRadius: "5px" }}
              size="small"
              href={`/campaigns/${router.query.campaignContractAddress}/pledge`}
              label="Pledge"
            />
          </Box>
        ) : rewardsDistributingSteate ? (
          <Box
            justify="center"
            pad="small"
            align="center"
            direction="row"
            gap="small"
          >
            <Button
              style={{ borderRadius: "5px" }}
              size="small"
              onClick={() =>
                navigate(`/campaign/${params.contractAddr}/pledge`)
              }
              label="Reward Distribute"
            />
          </Box>
        ) : undefined}
      </Box>
    </Box>
  );
}
