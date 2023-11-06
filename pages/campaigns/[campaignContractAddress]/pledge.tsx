import { Layer, Box, Text, Button } from "grommet";
import { Close } from "grommet-icons";
import { useRouter } from "next/router";
import React from "react";
import { Link } from "react-router-dom";
import { campaignsInfo } from "../../../utils/campaignsInfo";

export const DelegationModal = () => {
  const router = useRouter();
  const selectedCampaign = campaignsInfo.find(
    (p) => p.campaign_addr === router.query.campaignContractAddress
  );
  console.log(selectedCampaign, "whis");
  return (
    <Box pad={{ horizontal: "5vw" }}>
      <Box pad={"medium"}>Delegate? or Redelegate?</Box>
    </Box>
  );
};

export default DelegationModal;
