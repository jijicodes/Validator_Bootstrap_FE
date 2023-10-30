import React from "react";
import { AvailableChain } from "../../utils/chains";
import { useQuery } from "@tanstack/react-query";

type FailedTraceResp = {code: number, message: string, details: any[]};

type SuccessTraceResp = ;

type TraceResp = FailedTraceResp | SuccessTraceResp;

export const useDenomTrace = (chainId: AvailableChain, denom: string) => {
  useQuery({
    queryKey: ["denom trace", chainId, denom],
    queryFn: () =>
      fetch(`https://rest.cosmos.directory/cosmoshub/ibc/apps/transfer/v1/denom_traces/B05539B66B72E2739B986B86391E5D08F12B8D5D2C2A7F8F8CF9ADF674DFA231`)
        .then((r) => r.json())
        .then((trace: TraceResp) => {
          return trace;
        }),
  });
};
