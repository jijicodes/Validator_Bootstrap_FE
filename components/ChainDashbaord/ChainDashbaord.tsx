import { Box, Text } from "grommet";
import React from "react";
import { useFetchValidatorSetInfo } from "../CreateCampaignForm/useFetchActiveValidatorSet";

type props = {
  chainName: string;
  active: number;
  all: number | undefined;
  position: number | undefined;
  validatorName: string | undefined;
};
export const ChainDashbaord = ({
  chainName,
  active,
  all,
  position,
  validatorName,
}: props) => {
  const showValidatorInfo = active && all && position && validatorName;
  return (
    <Box fill>
      <Box background="lightGray" pad="small" gap="small">
        <Text weight="bold">{chainName}</Text>
        <Box>
          <Text size="14px">Active/Allocated</Text>
          <Text>
            {active}/{all}
          </Text>
        </Box>
        <Box>
          {showValidatorInfo && (
            <Text>
              <b>{validatorName}</b> is currently ranked at position {position}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
