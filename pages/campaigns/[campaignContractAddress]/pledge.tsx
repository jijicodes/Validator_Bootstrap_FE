import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { campaignsInfo } from "../../../utils/campaignsInfo";
import { ConnectWalletButton } from "../../../components";
import { chains as chainList } from "../../../utils/chains";
import { useChain } from "@cosmos-kit/react";
import Link from "next/link";
import DelegationCard from "../../../components/DelegationCard/DelegationCard";
import { assets } from "chain-registry";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { osmosis } from "osmojs";
import { BalancerPoolInfo } from "osmojs/dist/codegen/osmosis/protorev/v1beta1/protorev";
import { useWalletBalance } from "../../../utils/useWalletBalance";

export const DelegationModal = () => {
  const router = useRouter();
  const selectedCampaign = campaignsInfo.find(
    (p) => p.campaign_addr === router.query.campaignContractAddress
  );
  const chainName =
    selectedCampaign && chainList[selectedCampaign.connectionId]?.chainName;
  const chainSymbol = assets.find((c) => c.chain_name === chainName)?.assets[0];
  const { isWalletConnecting, connect } = useChain(chainName || "");
  const { data: walletBalance } = useWalletBalance(chainName);

  console.log(walletBalance, "walletBalance");
  return (
    <Box>
      <Flex p="6">
        <Link href={`/campaigns/${router.query.campaignContractAddress}`}>
          Back
        </Link>
        <Spacer />
        <ConnectWalletButton
          onClickConnectBtn={connect}
          isLoading={isWalletConnecting}
        />
      </Flex>
      <Box>
        <DelegationCard
          availableFund={
            walletBalance?.balances?.[0]
              ? (
                  Number(walletBalance?.balances?.[0]?.amount) / 1_000_000
                ).toString()
              : "0"
          }
          selectedAssetInfo={chainSymbol}
        />
      </Box>
    </Box>
  );
};

export default DelegationModal;
