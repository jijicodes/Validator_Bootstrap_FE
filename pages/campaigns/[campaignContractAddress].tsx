import {
  Box,
  Image,
  Text,
  Button,
  NameValueList,
  NameValuePair,
} from "grommet";
import Link from "next/link";
import { useRouter } from "next/router";
import { Chain } from "../../components/Chain/Chain";
import { campaignsInfo } from "../../utils/campaignsInfo";
import { chains } from "../../utils/chains";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { ValidatorName } from "../../components/ValidatorName/ValidatorName";

export default function Page() {
  const router = useRouter();
  const selectedCampaign = campaignsInfo.find(
    (p) => p.campaign_addr === router.query.campaignContractAddress
  );
  const chainId = chains[selectedCampaign?.connection_id]?.chainId;
  const endDate =
    selectedCampaign &&
    selectedCampaign.campaignStatus.campaign_info.expiration;
  //2024-10-30T14:48:00.000Z
  const expiresIn = endDate && formatDistanceToNow(parseISO(endDate));

  const validatorAddress =
    selectedCampaign?.campaignStatus.campaign_info.validator_address;

  const [validatorInfo, setValidatorInfo] = useState({});
  useEffect(() => {
    fetch(`https://validators-api.herokuapp.com/validator/${validatorAddress}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setValidatorInfo(data);
      });
  }, [validatorAddress]);

  const totalAmountPledged = selectedCampaign?.pledges.reduce(
    (a, b) => a + Number(b?.amount),
    0
  );
  console.log(totalAmountPledged);

  return (
    <Box pad={{ horizontal: "5vw" }}>
      <Box pad={"medium"}>
        <Button hoverIndicator as={Link} href="/campaigns" label="Back" />
      </Box>
      <Box align="center" gap="large">
        <Box gap="small" pad="small">
          <ValidatorName
            borderRadius="25%"
            chainId={chainId}
            valoperAddress={validatorAddress}
          />
          <Text>{validatorInfo?.validator?.description?.details}</Text>
          {router.query.campaignContractAddress}
        </Box>
        <Box>
          <NameValueList>
            <NameValuePair name="State">
              <Text>{selectedCampaign?.campaignStatus.state}</Text>
            </NameValuePair>
            <NameValuePair name="Chain">
              <Chain chain={chainId} />
            </NameValuePair>{" "}
            <NameValuePair name="Target Goal">
              <Text>{selectedCampaign?.target_position}</Text>
            </NameValuePair>{" "}
            <NameValuePair name="Current Rank">
              <Text>{validatorInfo?.validator?.ranking}</Text>
            </NameValuePair>
            <NameValuePair name="Number of Pledges">
              <Text>{selectedCampaign?.pledges.length}</Text>
            </NameValuePair>
            <NameValuePair name="Time Left">
              <Text>{`${expiresIn?.slice(0, 1).toUpperCase()}${expiresIn?.slice(
                1
              )}`}</Text>
            </NameValuePair>
            <NameValuePair name="Total Amount Pledged">
              <Text>{totalAmountPledged}</Text>
            </NameValuePair>
            <NameValuePair name="Completed">
              <Text>{"20%"}</Text>
            </NameValuePair>{" "}
          </NameValueList>
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
    </Box>
  );
}
