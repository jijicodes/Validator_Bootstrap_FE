import { Box, Text, Stack, Meter, Button } from "grommet";
import Link from "next/link";
import { useRouter } from "next/router";
import { Chain } from "../../components/Chain/Chain";

export default function Page() {
  const router = useRouter();
  return (
    <Box gap="large">
      <Box>
        <Button hoverIndicator as={Link} href="/campaigns" label="Back" />
        <Box pad="small" align="center">
          {router.query.campaignContractAddress}
        </Box>
      </Box>
      <Box pad="small">
        <Box direction="row">
          <Text>Chain</Text>
        </Box>
        <Box direction="row" gap="small">
          <Text>Target Goal:</Text>
          <Text> #98</Text>
        </Box>
        <Box direction="row" gap="small">
          <Text>Completed</Text>
          <Stack anchor="right">
            <Meter
              background="darkGray"
              values={[
                {
                  value: 60,
                  color: "gray",
                  label: "sixty",
                },
              ]}
            />
            <Box>
              <Text>60%</Text>
            </Box>
          </Stack>
        </Box>
        <Text>Time Left: 3days</Text>
        <Text>#of pledges: 9 </Text>
      </Box>
      <Box
        justify="center"
        pad="small"
        align="center"
        direction="row"
        gap="small"
      >
        <Button
          style={{ borderRadius: "5px" }}
          size="small"
          onClick={() => navigate(`/campaign/${params.contractAddr}/pledge`)}
          label="Pledge Delegation"
        />
        <Button
          style={{ borderRadius: "5px" }}
          size="small"
          onClick={() => navigate(`/campaign/${params.contractAddr}/pledge`)}
          label="Pledge Redelegation"
        />
      </Box>
    </Box>
    // <Box>
    //   <Box align="center" pad={{ vertical: "small" }}>
    //     <Text size="large">{router.query.campaignContractAddress}</Text>
    //   </Box>
    // </Box>
  );
}
