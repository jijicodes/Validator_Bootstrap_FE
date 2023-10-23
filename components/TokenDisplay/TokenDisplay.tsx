import React from "react";
import { AvailableChain } from "../../utils/chains";

type Props = {
  chainId: AvailableChain;
  denom: string;
  amount: string;
};

export const TokenDisplay = ({ chainId, denom, amount }: Props) => {
  return <div>TokenDisplay</div>;
};
