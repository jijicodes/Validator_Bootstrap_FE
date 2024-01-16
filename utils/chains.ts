import React from "react";

export const chains = {
  "connection-0": {
    chainName: "cosmoshub",
    chainId: "cosmoshub-4",
    rest: "https://rest.cosmos.directory/cosmoshub",
    rpc: "https://rpc.cosmos.directory/cosmoshub",
  },
  "connection-2": {
    chainName: "kujira",
    chainId: "kaiyo-1",
    rest: "https://rest.cosmos.directory/kujira",
    rpc: "https://rpc.cosmos.directory/kujira",
  },
  "connection-8": {
    chainName: "migaloo",
    chainId: "migaloo-1",
    rest: "https://rest.cosmos.directory/migaloo",
    rpc: "https://rpc.cosmos.directory/migaloo",
  },
  "connection-9": {
    chainName: "phoenix",
    chainId: "phoenix-1",
    rest: "https://rest.cosmos.directory/terra2",
    rpc: "https://rpc.cosmos.directory/terra2",
  },
  // "connection-15": {
  //   chainId: "stride-1",
  //   rest: "https://rest.cosmos.directory/stride",
  //   rpc: "https://rpc.cosmos.directory/stride",
  // },
  "connection-18": {
    chainName: "osmosis",
    chainId: "osmosis-1",
    rest: "https://rest.cosmos.directory/osmosis",
    rpc: "https://rpc.cosmos.directory/osmosis",
  },
  "connection-21": {
    chainName: "mars",
    chainId: "mars-1",
    rest: "https://rest.cosmos.directory/mars",
    rpc: "https://rpc.cosmos.directory/mars",
  },
  "connection-23": {
    chainName: "stargaze",
    chainId: "stargaze-1",
    rest: "https://rest.cosmos.directory/stargaze",
    rpc: "https://rpc.cosmos.directory/stargaze",
  },
} as const;

export type AvailableConnectionId = keyof typeof chains;
export type AvailableChain = (typeof chains)[AvailableConnectionId]["chainId"];

export const isAvailableConnectionId = (
  possibleConnectionId: string
): possibleConnectionId is AvailableConnectionId =>
  possibleConnectionId in chains;
