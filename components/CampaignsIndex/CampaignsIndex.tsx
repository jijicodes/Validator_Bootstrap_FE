import {
  Box,
  Text,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHeader,
  Button,
} from "grommet";
import { assets, chains, ibc } from "chain-registry";
import { ValidatorName } from "../ValidatorName/ValidatorName";
import Link from "next/link";
import { Chain } from "../Chain/Chain";

const campaigns = [
  {
    validator_address: "cosmosvaloper1kn3wugetjuy4zetlq6wadchfhvu3x740ae6z6x",
    target_position: 103,
    campaign_address:
      "neutron1m2emc93m9gpwgsrsf2vylv9xvgqh654630v7dfrhrkmr5slly53spg85wv",
    chain: "osmosis-1",
  },
  {
    validator_address: "cosmosvaloper103agss48504gkk3la5xcg5kxplaf6ttnuv234h",
    target_position: 89,
    campaign_address:
      "neutron1dwp6m7pdrz6rnhdyrx5ha0acsduydqcpzkylvfgspsz60pj2agxqaqrr7g",
    chain: "stargaze-1",
  },
  {
    validator_address: "cosmosvaloper16qnr6snzq49l6grkyu39lzchnfv3ajfdvejx55",
    target_position: 50,
    campaign_address:
      "neutron1dwp6m7pdrz6rnhdyrx5ha0acsduydqcpzkylvfgspsz60pj2agxqaqrr7g",
    chain: "juno-1",
  },
];

export const CampaignsIndex = () => {
  return (
    <Box gap="small" align="center" pad={{ vertical: "small" }}>
      <Text weight="bold" size="large">
        Active Campaigns
      </Text>

      <Table>
        <TableHeader>
          <TableCell>
            <Text>Validator</Text>
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
          {campaigns.map(
            ({
              validator_address,
              target_position,
              campaign_address,
              chain,
            }) => (
              <TableRow
                key={validator_address}
                // onClick={() => navigate(`/campaign/${campaign_address}`)}
              >
                <Button
                  as={Link}
                  href={`/campaigns/${campaign_address}`}
                  justify="stretch"
                  fill
                  hoverIndicator
                >
                  <TableCell>
                    <ValidatorName
                      chainId="cosmoshub-4"
                      valoperAddress={validator_address}
                    />
                  </TableCell>
                </Button>
                <TableCell>
                  <Chain chain={chain} />
                </TableCell>
                <TableCell justify="end">{target_position}</TableCell>{" "}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Box>
  );
};
