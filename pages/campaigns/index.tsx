import { Box, Button, Header, Text } from "grommet";
import React from "react";
import Link from "next/link";
import { CampaignsIndex } from "../../components/CampaignsIndex/CampaignsIndex";

const Page = () => {
  return (
    <Box direction="column" pad={{ horizontal: "5vw" }}>
      <Header justify="between">
        <Box>
          <Button as={Link} href="/" label="Back" />
        </Box>
      </Header>

      <Box align="center">
        <CampaignsIndex />
      </Box>
    </Box>
  );
};

export default Page;
