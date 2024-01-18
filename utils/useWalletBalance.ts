import { osmosis } from "osmojs";
import { useChain, useChainWallet } from "@cosmos-kit/react";
import { useEffect, useState } from "react";
import { QueryAllBalancesResponse } from "osmojs/dist/codegen/cosmos/bank/v1beta1/query";
import { useQuery } from "@tanstack/react-query";

export const useWalletBalance = (chainName: string | undefined) => {
  const { address } = useChain(chainName || "");

  return useQuery({
    queryKey: ["wallet balance", chainName, address],
    queryFn: () =>
      address && chainName
        ? osmoJsWalletBalanceInfo(address, chainName)
        : Promise.resolve(undefined),
    enabled: !!(address && chainName),
  });
};

const osmoJsWalletBalanceInfo = async (address: string, endpoint: string) => {
  const { createRPCQueryClient } = osmosis.ClientFactory;
  const client = await createRPCQueryClient({
    rpcEndpoint: `https://rpc.cosmos.directory/${endpoint}`,
  });
  const balance = await client.cosmos.bank.v1beta1.allBalances({
    address,
  });

  return balance;
};
