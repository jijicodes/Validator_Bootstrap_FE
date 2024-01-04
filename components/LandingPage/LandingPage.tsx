import React from "react";
import { Box, Text, Button } from "grommet";
import Link from "next/link";

export const LandingPage = () => {
  return (
    <Box align="center" gap="medium">
      <Text>Validator Bootstrap</Text>
      <Box gap="medium">
        <Box direction="column" gap="small">
          <Box>
            Validators, We are here to help you to get in the active chain you
            want to be in. Go ahead create a new campaign.
          </Box>
          <Box align="center">
            <Button
              primary
              as={Link}
              href="/createCampaignForm"
              label="Create a new campaign"
            />
          </Box>
        </Box>
        <Box gap="small" direction="column">
          <Box>Individuals, you can participate to pledge the campaign</Box>{" "}
          <Box align="center">
            <Button
              primary
              as={Link}
              href="/campaigns"
              label="Participate to pledge"
            />
          </Box>
        </Box>
      </Box>{" "}
    </Box>
  );
};

export default LandingPage;
