import { Anchor, Box, Grid, NameValuePair, Tag, Text } from "grommet";
import React from "react";

type props = {
  chainName: string;
  active: number;
  all: number | undefined;
  currentRanking: number | undefined;
  validatorName: { name: string; address: string };
  validatorsInfo:
    | {
        description: { moniker: string; website: string };
        tokens: string;
      }
    | undefined;
  position: number | undefined;
  targetedPositionInfo: {
    operator_address: string;
    description: { moniker: string };
    website: string;
    tokens: string;
  };
};
export const ChainDashbaord = ({
  chainName,
  active,
  all,
  currentRanking,
  validatorName,
  validatorsInfo,
  position,
  targetedPositionInfo,
}: props) => {
  const requiredMoney = (
    (Number(targetedPositionInfo?.tokens) -
      Number(validatorsInfo?.tokens) +
      1000000) /
    1000000
  ).toLocaleString("en-EN");

  return (
    <Box gap="small">
      <Box gap="small">
        <Text weight="bold" alignSelf="center">
          {chainName}
        </Text>
        {active && all ? (
          <>
            <Text>Active/Allocated</Text>
            <Text>
              {active}/{all}
            </Text>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Grid
        columns={{
          count: 2,
          size: "auto",
        }}
        gap="small"
      >
        <Box gap="small">
          {currentRanking && validatorName ? (
            <Box gap="small">
              <Box direction="row" align="center" gap="xsmall">
                <Text weight="bold">Where you at now</Text>
                <Tag size="small" value={currentRanking} />
              </Box>
              <NameValuePair name="Validator">
                <Anchor
                  target="_blank"
                  href={validatorsInfo?.description.website}
                  label={validatorName.name}
                />
              </NameValuePair>
              <NameValuePair name="Address">
                <Text>{validatorName.address}</Text>
              </NameValuePair>
              <NameValuePair name="Voting Power">
                <Text>
                  {(Number(validatorsInfo?.tokens) / 1000000).toLocaleString(
                    "en-EN"
                  )}
                </Text>
              </NameValuePair>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <Box gap="small">
          {position ? (
            <Box gap="small">
              <Box direction="row" align="center" gap="xsmall">
                <Text weight="bold">Your Targeted Rank</Text>
                <Tag size="small" value={position} />
              </Box>
              <NameValuePair name="Validator">
                <Anchor
                  target="_blank"
                  href={targetedPositionInfo.description.website}
                  label={targetedPositionInfo.description.moniker}
                />
              </NameValuePair>
              <NameValuePair name="Address">
                {targetedPositionInfo.operator_address}
              </NameValuePair>
              <NameValuePair name="Voting Power">
                <Text size="17px">
                  {(
                    Number(targetedPositionInfo.tokens) / 1000000
                  ).toLocaleString("en-EN")}
                </Text>
              </NameValuePair>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Grid>{" "}
      <Box>
        {position ? (
          <Text>{`You need ${requiredMoney} ${chainName} token to be reached at ${position}`}</Text>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
