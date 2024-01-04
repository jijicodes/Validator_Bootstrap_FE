import React, { useState } from "react";
import { Box, Button, FormField, Select, Text, TextInput } from "grommet";
import { assets, chains as registryChains } from "chain-registry";
import { useQueryValidator } from "../../hooks/useQueryValidator";
import { Search } from "grommet-icons";
import { AvailableChain, chains } from "../../utils/chains";
import { createFormFactory, useForm } from "@tanstack/react-form";
import { ChainDashbaord } from "../ChainDashbaord/ChainDashbaord";
import { useQuery } from "@tanstack/react-query";
import { useFetchValidatorSetInfo } from "./useFetchActiveValidatorSet";

type NewCampaign = {
  chainId: AvailableChain;
  validatorAddress: string;
  targetPosition: number | null;
  duration: string;
};

export const CreateCampaignForm = () => {
  const form = useForm<NewCampaign>({
    defaultValues: {
      chainId: "cosmoshub-4",
      validatorAddress: "",
      targetPosition: null,
      duration: "30 days",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
    },
  });

  const chainList = Object.entries(chains).map(([_, { chainId, rest }]) => ({
    value: chainId,
    label: registryChains.find((chainInfo) => chainInfo.chain_id === chainId)
      ?.pretty_name,
    endpoint: rest,
  }));
  const { data: validatorsInfo } = useQueryValidator(
    form.getFieldValue("chainId")
  );
  const validatorsOption = validatorsInfo?.map((v) => ({
    name: v.description.moniker,
    address: v.operator_address,
  }));
  const [selectedChain, setSelectedChain] = useState("");
  const [validator, setValidator] = useState<{
    name: string;
    address: string;
  }>();
  const [searchValue, setSearchValue] = useState("");
  const filteredValidators = searchValue
    ? validatorsOption
        // ?.map((v) => v.name)
        ?.filter((o) => new RegExp(searchValue, "i").test(o.name))
    : validatorsOption?.map((v) => v);
  const { data: validatorSetInfo } = useFetchValidatorSetInfo(
    form.getFieldValue("chainId")
  );

  const validatorPosition =
    validatorSetInfo.entireValidatorsList &&
    validatorSetInfo.entireValidatorsList?.findIndex(
      (v) => v.operator_address === validator?.address
    ) + 1;
  return (
    <Box fill gap="large">
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
      <Box fill justify="between" direction="row">
        <Box fill pad="medium">
          <form.Provider>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}
            >
              <>
                <form.Field name="chainId">
                  {(field) => (
                    <FormField label="Chain Name" htmlFor="chain" name="chain">
                      <Select
                        placeholder={"Which Chain are you trying to get in?"}
                        value={field.state.value}
                        name={field.name}
                        valueKey="value"
                        labelKey="label"
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.option.value);
                          setSelectedChain(e.option.label);
                        }}
                        icon={<Search size="16px" />}
                        options={chainList}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="validatorAddress">
                  {(field) => {
                    return (
                      <FormField
                        label="Validator"
                        htmlFor="validator"
                        name="validator"
                      >
                        <Select
                          placeholder="Which validator are you?"
                          searchPlaceholder="Type the validator"
                          value={validator?.address}
                          name={field.name}
                          valueKey="address"
                          labelKey={"name"}
                          icon={<Search size="16px" />}
                          emptySearchMessage="No validators found"
                          closeOnChange
                          onChange={({ option }) => {
                            field.handleChange(option.address);
                            setValidator(option);
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
                    );
                  }}
                </form.Field>
                <form.Field name="targetPosition">
                  {(field) => (
                    <FormField
                      label="Target Position"
                      htmlFor="goal"
                      name="goal"
                      required
                    >
                      <TextInput
                        placeholder="What target position are you trying to get in?"
                        id="text-input-id"
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(e.target.valueAsNumber)
                        }
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="duration">
                  {(field) => (
                    <FormField
                      label="Duration"
                      htmlFor="duration"
                      name="duration"
                      required
                    >
                      <Select
                        placeholder={
                          "How long do you want to run your campaign?"
                        }
                        value={field.state.value}
                        name={field.name}
                        valueKey="value"
                        labelKey="label"
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          field.handleChange(e.value);
                        }}
                        icon={<Search size="16px" />}
                        options={["30 Days", "45 Days", "60 Days", "90 Days"]}
                      />
                    </FormField>
                  )}
                </form.Field>
              </>
            </form>
          </form.Provider>
          {/* //current position
        //remaining dates */}
          <Box direction="row" justify="center">
            <Button type="submit" primary label="Submit" />
          </Box>
        </Box>
        <Box style={{ borderLeft: "1px solid" }} />
        <Box fill pad="medium">
          <ChainDashbaord
            active={validatorSetInfo.activeValidatorsCount}
            all={validatorSetInfo.allValidatorsCount}
            chainName={selectedChain}
            validatorName={validator?.name}
            position={validatorPosition}
          />
        </Box>
      </Box>
    </Box>
  );
};
