import React from "react";
import { Box, Text, Button } from "grommet";
import Link from "next/link";

export const LandingPage = () => {
  return (
    <Box align="center">
      <Box gap="medium">
        <Text>Validator Bootstrap</Text>
        <Box>Description goes here!!</Box>
      </Box>
      <Box gap="small" direction="row">
        <Button
          primary
          as={Link}
          href="/createCampaignForm"
          label="Create a new campaign"
        />
        <Button
          primary
          as={Link}
          href="/campaigns"
          label="Participate to pledge"
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
