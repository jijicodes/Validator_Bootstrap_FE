import React, { useState } from "react";
import { Box, Button, FormField, Select, Text, TextInput } from "grommet";
import { assets, chains as registryChains } from "chain-registry";
import { useQueryValidator } from "../../hooks/useQueryValidator";
import { Search } from "grommet-icons";
import { AvailableChain, chains } from "../../utils/chains";
import { ChainDashbaord } from "../ChainDashbaord/ChainDashbaord";
import { useForm, Controller } from "react-hook-form";
import { useFetchValidatorSetInfo } from "./useFetchActiveValidatorSet";
import { DevTool } from "@hookform/devtools";

type NewCampaign = {
  chainId: AvailableChain;
  validatorAddress: { name: ""; address: "" };
  targetPosition: string | undefined;
  duration: string;
};

export const CreateCampaignForm = () => {
  const { register, control, handleSubmit, getValues, watch } =
    useForm<NewCampaign>({
      defaultValues: {
        // TODO: should be cosmoshub-4 when we ship to prod
        chainId: "kaiyo-1",
        validatorAddress: {},
        targetPosition: "",
        duration: "30 days",
      },
    });
  const selectedValue = watch([
    "chainId",
    "validatorAddress",
    "targetPosition",
    "duration",
  ]);
  const chainList = Object.entries(chains).map(([_, { chainId, rest }]) => ({
    chainId,
    chainName: registryChains.find(
      (chainInfo) => chainInfo.chain_id === chainId
    )?.pretty_name,
    endpoint: rest,
  }));
  const { data: validatorsInfo, isLoading: validatorListLoading } =
    useQueryValidator(selectedValue[0]);

  const validatorsOption = validatorsInfo?.map((v) => ({
    name: v.description.moniker,
    address: v.operator_address,
  }));
  const [searchValue, setSearchValue] = useState("");
  const filteredValidators = searchValue
    ? validatorsOption
        // ?.map((v) => v.name)
        ?.filter(
          (o) =>
            new RegExp(searchValue, "i").test(o.name) ||
            new RegExp(searchValue, "i").test(o.address)
        )
    : validatorsOption?.map((v) => v);
  const { data: validatorSetInfo } = useFetchValidatorSetInfo(selectedValue[0]);
  const validatorPosition =
    validatorSetInfo.entireValidatorsList &&
    validatorSetInfo.entireValidatorsList?.findIndex(
      (v) => v.operator_address === selectedValue[1].address
    ) + 1;

  const targetPositionInfo =
    selectedValue &&
    validatorSetInfo?.entireValidatorsList &&
    validatorSetInfo?.entireValidatorsList[Number(selectedValue[2]) - 1];

  return (
    <Box gap="large">
      <Box gap="large" align="center">
        <Box align="center">
          <Text size="large">Create Campaign</Text>
        </Box>
      </Box>
      <Box>
        <Text wordBreak="break-word">
          Hello Validators,<br></br> In order for your campaign goes active,
          fill this form out and also send us $USDC
        </Text>
      </Box>
      <Box fill pad="medium">
        <ChainDashbaord
          active={validatorSetInfo.activeValidatorsCount}
          all={validatorSetInfo.allValidatorsCount}
          chainName={selectedValue[0]}
          validatorName={selectedValue[1]}
          validatorsInfo={validatorSetInfo?.entireValidatorsList?.find(
            (v) => v.description.moniker === selectedValue[1].name
          )}
          currentRanking={validatorPosition}
          position={Number(selectedValue[2])}
          targetedPositionInfo={targetPositionInfo}
        />
      </Box>
      <Box fill justify="between" direction="column">
        <Box fill pad="medium">
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data, "Data");
            })}
          >
            <Controller
              name="chainId"
              control={control}
              render={({ field }) => (
                <FormField htmlFor="chainName" label="Chain Name">
                  <Select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.value.chainId);
                    }}
                    placeholder={"Which Chain are you trying to get in?"}
                    icon={<Search size="16px" />}
                    options={chainList}
                    closeOnChange
                    valueKey={"chainId"}
                    labelKey={"chainName"}
                  />
                </FormField>
              )}
            />
            {/* <Controller
              name="validatorAddress"
              control={control}
              render={({ field }) => (
                <FormField label="Validator" htmlFor="validator">
                  <Select
                    {...field}
                    placeholder="Which validator are you?"
                    searchPlaceholder="Type the validator name or address"
                    icon={<Search size="16px" />}
                    emptySearchMessage="No validators found"
                    closeOnChange
                    disabled={validatorListLoading}
                    valueKey="address"
                    labelKey="name"
                    onChange={(e) => {
                      field.onChange(e.option);
                      setSearchValue("");
                    }}
                    onSearch={(text) => {
                      const escapedText = text.replace(
                        /[-\\^$*+?.()|[\]{}]/g,
                        "\\$&"
                      );
                      setSearchValue(escapedText);
                    }}
                    options={filteredValidators || []}
                  />
                </FormField>
              )}
            />
            <Controller
              name="targetPosition"
              control={control}
              render={({ field }) => (
                <FormField label="Target Position" htmlFor="goal">
                  <TextInput
                    {...field}
                    placeholder={
                      !selectedValue[1].name
                        ? "Targeted Position"
                        : `you current position is ${validatorPosition}`
                    }
                    type="number"
                    onChange={(e) => {
                      const expectedTargetPosition =
                        validatorPosition &&
                        Number(e.target.value) < validatorPosition
                          ? e.target.value
                          : "";
                      return field.onChange(expectedTargetPosition);
                    }}
                  />
                </FormField>
              )}
            />
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <FormField label="Duration" htmlFor="duration">
                  <Select
                    {...field}
                    placeholder="How long do you want to run your campaign?"
                    valueKey="value"
                    labelKey="label"
                    onChange={(e) => {
                      return field.onChange(e.value);
                    }}
                    icon={<Search size="16px" />}
                    options={["30 Days", "45 Days", "60 Days", "90 Days"]}
                  />
                </FormField>
              )}
            /> */}
          </form>
        </Box>
        {/* //current position
        //remaining dates */}

        <Button type="submit" primary label="Submit" />
      </Box>
      <Box style={{ borderLeft: "1px solid" }} />
    </Box>
  );
};
