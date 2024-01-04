import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AvailableChain } from "../Utils/chainOptions";
import { chains as registryChains } from "chain-registry";
import { chains } from "../../utils/chains";
import { useState } from "react";

export interface AllValidatorInfoTypes {
  validators: Validator[];
  pagination: Pagination;
}

interface Pagination {
  next_key: string;
  total: string;
}

interface Validator {
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: Status;
  tokens: string;
  delegator_shares: string;
  description: Description;
  unbonding_height: string;
  unbonding_time: Date;
  commission: Commission;
  min_self_delegation: string;
  unbonding_on_hold_ref_count: string;
  unbonding_ids: string[];
}

interface Commission {
  commission_rates: CommissionRates;
  update_time: Date;
}

interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

interface ConsensusPubkey {
  "@type": Type;
  key: string;
}

enum Type {
  CosmosCryptoEd25519PubKey = "/cosmos.crypto.ed25519.PubKey",
}

interface Description {
  moniker: string;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

enum Status {
  BondStatusBonded = "BOND_STATUS_BONDED",
  BondStatusUnbonded = "BOND_STATUS_UNBONDED",
  BondStatusUnbonding = "BOND_STATUS_UNBONDING",
}

//The number of active validator set
const fetchActiveValidatorsCount = (chainId: AvailableChain) =>
  fetch(
    `${
      Object.values(chains).find((chainInfo) => chainInfo.chainId === chainId)
        ?.rest
    }/cosmos/base/tendermint/v1beta1/validatorsets/latest?pagination.count_total=true`
  )
    .then((resp) => resp.json())
    .then((data) => {
      return data?.pagination?.total;
    });

export const useFetchActiveValidatorsCount = (chainId: AvailableChain) => {
  return useQuery({
    queryKey: ["activeValidatorSet", chainId],
    queryFn: () => fetchActiveValidatorsCount(chainId),
    staleTime: 10 * 60 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

//The entire pagination validators list
const fetchValidators = (
  chainId: AvailableChain,
  nextKey?: string
): Promise<Validator[]> =>
  fetch(
    `${
      Object.values(chains).find((chainInfo) => chainInfo.chainId === chainId)
        ?.rest
    }/cosmos/staking/v1beta1/validators?${
      nextKey ? `pagination.key=${encodeURIComponent(nextKey)}` : ""
    }`
  )
    .then((resp) => resp.json())
    .then(async (allValidators: AllValidatorInfoTypes) =>
      allValidators.pagination.next_key
        ? [
            ...allValidators.validators,
            ...(await fetchValidators(
              chainId,
              allValidators.pagination.next_key
            )),
          ]
        : allValidators.validators
    )
    .then((allValidators) => {
      const sortedValidators = allValidators.sort((a, b) =>
        Number(BigInt(b.tokens) - BigInt(a.tokens))
      );

      return sortedValidators;
    });

export const useFetchValidators = (chainId: AvailableChain) => {
  return useQuery({
    queryKey: ["allValidators", chainId],
    queryFn: () => fetchValidators(chainId),
    staleTime: 10 * 60 * 60 * 1000,
    retry: false,
  });
};

//total number of validators
const fetchAllValidatorCount = (chainId: AvailableChain) => {
  return fetch(
    `${
      Object.values(chains).find((chainInfo) => chainInfo.chainId === chainId)
        ?.rest
    }/cosmos/staking/v1beta1/validators?pagination.count_total=true&pagination.limit=1`
  )
    .then((resp) => resp.json())
    .then((allValidators: AllValidatorInfoTypes) =>
      Number(allValidators?.pagination?.total)
    );
};

export const useFetchAllValidatorsCount = (chainId: AvailableChain) => {
  return useQuery({
    queryKey: ["allValidatorSet", chainId],
    queryFn: () => fetchAllValidatorCount(chainId),
    staleTime: 10 * 60 * 60 * 1000,
  });
};

export const useFetchValidatorSetInfo = (chainId: AvailableChain) => {
  const entireValidatorsList = useFetchValidators(chainId);
  const activeValidatorsCount = useFetchActiveValidatorsCount(chainId);
  const allValidatorsCount = useFetchAllValidatorsCount(chainId);

  return {
    data: {
      entireValidatorsList: entireValidatorsList?.data,
      allValidatorsCount: allValidatorsCount?.data,
      activeValidatorsCount: activeValidatorsCount?.data,
    },
    isLoading:
      activeValidatorsCount.isLoading ||
      allValidatorsCount.isLoading ||
      entireValidatorsList.isLoading,
  };
};
