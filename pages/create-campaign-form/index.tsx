import { Box, Button, Text } from "grommet";
import React from "react";
import Link from "next/link";
import { CreateCampaignForm } from "../../components/CreateCampaignForm/CreateCampaignForm";

export const Page = () => {
  return (
    <Box direction="column" pad={{ horizontal: "5vw" }}>
      <Box>
        <Button as={Link} href="/" label="Back" />
      </Box>
      <Box align="center">
        <CreateCampaignForm />
      </Box>
    </Box>
  );
};

export default Page;
