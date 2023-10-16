import { Box, Image, Text, TextProps } from "grommet";
import { useQueryValidator } from "../../hooks/useQueryValidator";
import { AvailableChain } from "../Utils/chainOptions";

type Props = {
  valoperAddress: string;
  chainId: AvailableChain;
  size?: TextProps["size"];
  disabled?: boolean;
  withCommission?: boolean;
};
export const ValidatorName = ({
  valoperAddress,
  chainId,
  size = "medium",
  withCommission,
}: Props) => {
  const { data: validator } = useQueryValidator(chainId, valoperAddress);
  const matchingValidator = validator?.find(
    (v) => v.operator_address === valoperAddress
  );
  return (
    <Box flex="shrink">
      <Box direction="row" justify="between" align="center">
        <Box gap="small" align="center" direction="row" flex="shrink">
          <Box border round flex={{ shrink: 0 }}>
            <Image
              alt="logo"
              height="30px"
              width="30px"
              style={{
                borderRadius: 10,
              }}
              src={matchingValidator?.icon}
              // fallback={`${process.env.PUBLIC_URL}/images/yieldmosmono.small.crushed.png`}
            />
          </Box>
          <Text size={size} weight="bold" truncate>
            {matchingValidator?.description?.moniker}
          </Text>
        </Box>
        {withCommission && (
          <Text alignSelf="center" size="small">
            {/* {Number(
              (
                Number(
                  validators.byAddr[valoperAddress]?.commission
                    ?.commission_rates?.rate
                ) * 100
              ).toFixed(2)
            )} */}
            % Comm.
          </Text>
        )}
      </Box>
    </Box>
  );
};
