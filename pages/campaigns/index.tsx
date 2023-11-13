import { Box, Button, Text } from "grommet";
import React from "react";
import Link from "next/link";
import { CampaignsIndex } from "../../components/CampaignsIndex/CampaignsIndex";

const Page = () => {
  return (
    <Box direction="column" pad={{ horizontal: "5vw" }}>
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
