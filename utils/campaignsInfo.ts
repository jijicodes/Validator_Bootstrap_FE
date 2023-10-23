import React from "react";
import { Campaign } from "../hooks/cwCodegen/factory/Factory.types";
import { CampaignStatusResponse } from "../hooks/cwCodegen/campaign/Campaign.types";
import {
  AvailableConnectionId,
  chains,
  isAvailableConnectionId,
} from "./chains";

export const campaignsInfo: (Campaign & {
  campaignStatus: CampaignStatusResponse;
  connectionId: AvailableConnectionId;
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
        remote_staking_denom: "uatom",
        reward_distribution_type: { Daily: { num_of_days: 30 } },
        target_position: 89,
        validator_address:
          "kujiravaloper1qkk2nwpq0k6aq02le5g2hmsmts8um3cx44usvy",
      },
      reward_tokens: [{ amount: "12000000000", denom: "ukuji" }],
      state: "Active" as const,
    },
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
        remote_staking_denom: "uatom",
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
  },
]
  .filter(({ connection_id }) => isAvailableConnectionId(connection_id))
  .map((campaign) => ({
    ...campaign,
    connectionId: campaign.connection_id as AvailableConnectionId,
  }));
