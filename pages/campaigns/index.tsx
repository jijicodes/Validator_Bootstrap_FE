import { Box, Button, Text } from "grommet";
import React from "react";
import Link from "next/link";
import { CampaignsIndex } from "../../components/CampaignsIndex/CampaignsIndex";

const Page = () => {
  return (
    <Box direction="column">
      <Box>
        <Button as={Link} href="/" label="Back" />
      </Box>
      <Box align="center">
        <Text>Campaign page</Text>
        <Box>
          <CampaignsIndex />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
