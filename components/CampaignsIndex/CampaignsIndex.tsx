import {
  Box,
  Text,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHeader,
  Button,
  Image,
} from "grommet";
import { assets, chains as registryChains } from "chain-registry";
import { ValidatorName } from "../ValidatorName/ValidatorName";
import Link from "next/link";
import { Chain } from "../Chain/Chain";
import { campaignsInfo } from "../../utils/campaignsInfo";
import { chains } from "../../utils/chains";
import { P, match } from "ts-pattern";
import { stateRank } from "../Utils/campaignStateUtils";
import { useScreenSize } from "../../hooks/useScreenSize";

export const CampaignsIndex = () => {
  return (
    <Box
      // fill
      gap="small"
      align="center"
    >
      <Text weight="bold" size="large">
        Active Campaigns
      </Text>

      <Table>
        <TableHeader>
          <TableCell>
            <Text>Validator</Text>
          </TableCell>
          <TableCell>
            <Text>Status</Text>
          </TableCell>
          <TableCell>
            <Text>Chain</Text>
          </TableCell>
          <TableCell>
            <Text>Goal Position</Text>
          </TableCell>
          <TableCell>
            <Text>Reward Distribution</Text>
          </TableCell>
        </TableHeader>
        <TableBody>
          {campaignsInfo
            // .sort(
            //   (
            //     { campaignStatus: { state: a } },
            //     { campaignStatus: { state: b } }
            //   ) => stateRank(a) - stateRank(b)
            // )
            .map(
              ({
                campaign_addr,
                target_position,
                connectionId,
                campaignStatus: {
                  campaign_info: { validator_address },
                  state,
                  reward_tokens,
                },
              }) => {
                const chainId = chains[connectionId].chainId;
                const chainInfo = registryChains.find(
                  ({ chain_id }) => chain_id === chainId
                );
                const chainAssets = assets.find(
                  ({ chain_name }) => chain_name === chainInfo?.chain_name
                );

                return (
                  <TableRow key={validator_address}>
                    <Button
                      as={Link}
                      href={`/campaigns/${campaign_addr}`}
                      justify="stretch"
                      fill
                      hoverIndicator
                    >
                      <TableCell>
                        <ValidatorName
                          chainId={chainId}
                          valoperAddress={validator_address}
                        />
                      </TableCell>
                    </Button>
                    <TableCell>
                      {match(state)
                        .with("Active", () => "Active")
                        .with("Delegating", () => "Delegating")
                        .with({ PendingStart: P._ }, () => `Pending Start`)
                        .with(
                          { RewardsDistribution: P._ },
                          () => "Rewards Distributing"
                        )
                        .with({ Ended: "RewardsCompleted" }, () => "Complete")
                        .with({ Ended: P._ }, ({ Ended }) => Ended)
                        .exhaustive()}
                    </TableCell>
                    <TableCell>
                      <Chain chain={chainId} />
                    </TableCell>
                    <TableCell justify="end">{target_position}</TableCell>{" "}
                    <TableCell justify="end">
                      <Box direction="row" gap="small">
                        {reward_tokens.map(({ amount, denom }) => {
                          const assetInfo = chainAssets?.assets.find(
                            (asset) => asset.base === denom
                          );
                          !assetInfo &&
                            console.log(
                              denom,
                              assetInfo,
                              assetInfo,
                              chainAssets?.assets
                            );
                          return assetInfo ? (
                            <Box
                              direction="row"
                              gap="xsmall"
                              key={assetInfo.base}
                              align="center"
                            >
                              <Image
                                height="25px"
                                width="25px"
                                src={
                                  assetInfo.logo_URIs?.jpeg ||
                                  assetInfo.logo_URIs?.png ||
                                  assetInfo.logo_URIs?.svg
                                }
                                alt={`${assetInfo.symbol} icon`}
                              />
                              <Text>
                                {Number(amount) /
                                  10 **
                                    assetInfo.denom_units
                                      .map(({ exponent }) => exponent)
                                      .reduce(
                                        (a, b) => Math.max(a, b),
                                        -Infinity
                                      )}
                              </Text>
                              <Text>{assetInfo.symbol}</Text>
                            </Box>
                          ) : (
                            <Box direction="row" gap="xsmall" key={denom}>
                              <Text>{Number(amount)}</Text>
                              <Text>
                                {denom.slice(0, 8)}..
                                {denom.slice(denom.length - 5)}
                              </Text>
                            </Box>
                          );
                        })}
                      </Box>
                    </TableCell>{" "}
                  </TableRow>
                );
              }
            )}
        </TableBody>
      </Table>
    </Box>
  );
};
