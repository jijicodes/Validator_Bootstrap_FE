import React from "react";
import { Campaign } from "../hooks/cwCodegen/factory/Factory.types";
import {
  CampaignStatusResponse,
  Pledge,
} from "../hooks/cwCodegen/campaign/Campaign.types";
import {
  AvailableConnectionId,
  chains,
  isAvailableConnectionId,
} from "./chains";

export const campaignsInfo: (Campaign & {
  campaignStatus: CampaignStatusResponse;
  connectionId: AvailableConnectionId;
  pledges: Pledge[];
})[] = [
  {
    campaign_addr:
      "neutron1dwp6m7pdrz6rnhdyrx5ha0acsduydqcpzkylvfgspsz60pj2agxqaqrr7g",
    connection_id: "connection-0",
    target_position: 103,
    campaignStatus: {
      campaign_info: {
        connection_id: "connection-0",
        expiration: "2024-10-30T14:48:00.000Z",
        factory_contract_addr: "neutron123factory",
        remote_staking_denom: "uatom",
        reward_distribution_type: { Daily: { num_of_days: 30 } },
        target_position: 103,
        validator_address:
          "cosmosvaloper1kn3wugetjuy4zetlq6wadchfhvu3x740ae6z6x",
      },
      reward_tokens: [
        {
          amount: (100_000_000).toString(),
          denom:
            "ibc/F04D72CF9B5D9C849BB278B691CDFA2241813327430EC9CDC83F8F4CA4CDC2B0",
        },
        { amount: "150000000", denom: "uatom" },
      ],
      state: "RewardsDistribution" as const,
    },
    pledges: [
      {
        amount: (1_000_000).toString(),
        pledge_address: "cosmos12emutgfv7hy46khk5x36e9fczuvk9ktpp9krdu",
        pledge_type: "Delegation",
      },
      {
        amount: (3_000_000).toString(),
        pledge_address: "cosmos16p6lrlxf7f03c0ka8cv4sznr29rym27up5d9kh",
        pledge_type: "Delegation",
      },
      {
        amount: (5_000_000).toString(),
        pledge_address: "cosmos1p7d8mnjttcszv34pk2a5yyug3474mhffasa7tg",
        pledge_type: {
          Redelegation: {
            from_validators: [
              "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
            ],
          },
        },
      },
    ],
  },

  {
    campaign_addr:
      "neutron1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshlt6zh",
    connection_id: "connection-2",
    target_position: 89,
    campaignStatus: {
      campaign_info: {
        connection_id: "connection-2",
        expiration: "2025-11-30T14:48:00.000Z",
        factory_contract_addr: "neutron456factory",
        remote_staking_denom: "ukuji",
        reward_distribution_type: { Daily: { num_of_days: 30 } },
        target_position: 89,
        validator_address:
          "kujiravaloper1qkk2nwpq0k6aq02le5g2hmsmts8um3cx44usvy",
      },
      reward_tokens: [{ amount: "12000000000", denom: "ukuji" }],
      state: "Active" as const,
    },
    pledges: [
      {
        amount: (10_000_000).toString(),
        pledge_address: "kujira12emutgfv7hy46khk5x36e9fczuvk9ktpsd5mqk",
        pledge_type: "Delegation",
      },
      {
        amount: (2_000_000).toString(),
        pledge_address: "kujira186j2ll6utcjh5ee6ggxzqh7q4c2l3hlmvktqar",
        pledge_type: "Delegation",
      },
      {
        amount: (1_000_000).toString(),
        pledge_address: "kujira1c24ktf5kck3ywxyyxuvyhgmwv9hqxahf0je5fa",
        pledge_type: {
          Redelegation: {
            from_validators: [
              "kujiravaloper1546l88y0g9ch5v25dg4lmfewgelsd3v966qj3y",
              "kujiravaloper1453e4qfcmhwyqrs2sgqmlgckzvmsgdvzzq4zdd",
            ],
          },
        },
      },
    ],
  },

  {
    campaign_addr:
      "neutron12pwnhtv7yat2s30xuf4gdk9qm85v4j3e6p44let47pdffpklcxlq56v0te",
    connection_id: "connection-23",
    target_position: 50,
    campaignStatus: {
      campaign_info: {
        connection_id: "connection-23",
        expiration: "2025-11-30T14:48:00.000Z",
        factory_contract_addr: "neutron789factory",
        remote_staking_denom: "ustars",
        reward_distribution_type: { Daily: { num_of_days: 30 } },
        target_position: 50,
        validator_address:
          "starsvaloper12v7p7unjm6wcj5ezak5zfneq05pfy8dps9c9jw",
      },
      reward_tokens: [
        {
          amount: (100_000_000).toString(),
          denom:
            "ibc/F663521BF1836B00F5F177680F74BFB9A8B5654A694D0D2BC249E03CF2509013",
        },
        {
          amount: (2_000_000_000).toString(),
          denom:
            "ibc/B05539B66B72E2739B986B86391E5D08F12B8D5D2C2A7F8F8CF9ADF674DFA231",
        },
      ],
      state: "Active" as const,
    },
    pledges: [
      {
        amount: (1_000_000).toString(),
        pledge_address: "stars12emutgfv7hy46khk5x36e9fczuvk9ktp4ep7xd",
        pledge_type: "Delegation",
      },
      {
        amount: (7_000_000).toString(),
        pledge_address: "stars1fhznrvfyv25f27se8pqw79ytfcwh45j02lswy6",
        pledge_type: "Delegation",
      },
      {
        amount: (2_000_000).toString(),
        pledge_address: "stars1mz2qks48v486d9m8wp4l9fxm2e9l0e0kfg23qv",
        pledge_type: {
          Redelegation: {
            from_validators: [
              "starsvaloper1ulvgmlttxhrnmegu57sj0n2qc7xvtrn9245jtu",
              "starsvaloper1mz2qks48v486d9m8wp4l9fxm2e9l0e0kzk79m5",
            ],
          },
        },
      },
    ],
  },
]
  .filter(({ connection_id }) => isAvailableConnectionId(connection_id))
  .map((campaign) => ({
    ...campaign,
    connectionId: campaign.connection_id as AvailableConnectionId,
  }));
