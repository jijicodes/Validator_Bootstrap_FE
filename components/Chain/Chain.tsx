import React from "react";
import { assets, chains, ibc } from "chain-registry";
import { Box, Text } from "grommet";

type Props = {
  chain: string;
};

export const Chain = ({ chain }: Props) => {
  const selectedChain = chains?.find((c) => c.chain_id === chain);
  const capitalized = `${selectedChain?.chain_name
    .charAt(0)
    .toUpperCase()}${selectedChain?.chain_name.slice(1)}`;

  return (
    <Box>
      <Text>{capitalized}</Text>
    </Box>
  );
};
