import React from "react";
import { AvailableChain } from "../../utils/chains";
import { useQuery } from "@tanstack/react-query";

export const useDenomTrace = (chainId: AvailableChain, denom: string) => {
  useQuery({
    queryKey: ["denom trace", chainId, denom],
    queryFn: () =>
      fetch(`http://validators-api.herokuapp.com/allValidators/${chainId}`)
        .then((r) => r.json())
        .then((validators: Validator[]) => {
          return validators;
        }),
  });
};
