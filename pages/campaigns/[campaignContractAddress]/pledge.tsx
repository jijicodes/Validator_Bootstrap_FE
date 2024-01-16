import { useRouter } from "next/router";
import React from "react";
import { campaignsInfo } from "../../../utils/campaignsInfo";
import { ConnectWalletButton } from "../../../components";
import { chains as chainList } from "../../../utils/chains";
import { useChain } from "@cosmos-kit/react";
import Link from "next/link";
import DelegationCard from "../../../components/DelegationCard/DelegationCard";
import { assets } from "chain-registry";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
export const DelegationModal = () => {
  const router = useRouter();
  const selectedCampaign = campaignsInfo.find(
    (p) => p.campaign_addr === router.query.campaignContractAddress
  );
  const chainName =
    selectedCampaign && chainList[selectedCampaign.connectionId]?.chainName;
  const chainSymbol = assets.find((c) => c.chain_name === chainName)?.assets[0];

  const chainContext = useChain(chainName || "cosmoshub");
  const {
    status,
    username,
    address,
    message,
    connect,
    disconnect,
    openView,
    isWalletConnecting,
  } = chainContext;
  console.log(assets, chainSymbol, "selected campaign");
  return (
    <Box>
      <Flex p="6">
        <Link href={`/campaigns/${router.query.campaignContractAddress}`}>
          Back
        </Link>
        <Spacer />
        <ConnectWalletButton
          onClickConnectBtn={chainContext.connect}
          isLoading={chainContext.isWalletConnecting}
        />
      </Flex>
      <Box>
        <DelegationCard selectedAssetInfo={chainSymbol} />
      </Box>
    </Box>
  );
};

export default DelegationModal;
