import { P, match } from "ts-pattern";
import { CampaignState } from "../../hooks/cwCodegen/campaign/Campaign.types";

export const stateRank = (state: CampaignState): number =>
  match(state)
    .with("Active", () => 1)
    .with({ RewardsDistribution: P._ }, () => 2)
    .otherwise(() => 3);
