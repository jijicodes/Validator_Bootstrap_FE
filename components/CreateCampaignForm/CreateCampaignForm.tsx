import React, { useState } from "react";
import { Box, Button, Form, FormField, Select, Text, TextInput } from "grommet";
import { assets, chains as registryChains } from "chain-registry";
import { useQueryValidator } from "../../hooks/useQueryValidator";
import { Search } from "grommet-icons";
import { AvailableChain, chains } from "../../utils/chains";
import { Chain } from "../Chain/Chain";

export const CreateCampaignForm = () => {
  //   const { data: validators } = useQueryValidator(chainId, valoperAddress);

  const [formSelectValues, setFormSelectValues] = useState<{
    selectedChain: AvailableChain;
    selectedValidator: string | undefined;
    selectedTargetGoal: number | undefined;
  }>({
    selectedChain: "cosmoshub-4",
    selectedValidator: undefined,
    selectedTargetGoal: undefined,
  });

  const chainList = Object.entries(chains).map(([_, { chainId }]) => ({
    value: chainId,
    label: registryChains.find((chainInfo) => chainInfo.chain_id === chainId)
      ?.pretty_name,
  }));

  const { data: validators } = useQueryValidator(
    formSelectValues.selectedChain
  );
  console.log(validators, formSelectValues);

  const validatorList = (validators || []).map((v) => v.description.moniker);

  return (
    <Box fill gap="large">
      <Box gap="large" align="center">
        <Box align="center">
          <Text size="large">Create Campaign</Text>
        </Box>
        <Box>
          <Text wordBreak="break-word">
            Hello Validators,<br></br> In order for your campaign goes active,
            fill this form out and also send us $USDC
          </Text>
        </Box>
      </Box>
      <Box pad="small" fill>
        <Form
          value={formSelectValues}
          //   onChange={(nextValue, { touched }) => {
          //     console.log("Change", nextValue, touched);
          //     setValue(nextValue);
          //   }}
          //   onReset={() => setValue(defaultValue)}
          //   onSubmit={(event) =>
          //     console.log("Submit", event.value, event.touched)
          //   }
        >
          <FormField label="Chain Name" htmlFor="chain" name="chain">
            <Select
              placeholder={"Which Chain are you trying to get in?"}
              value={formSelectValues["selectedChain"]}
              valueKey="value"
              labelKey="label"
              onChange={(e) => {
                return setFormSelectValues({
                  ...formSelectValues,
                  selectedChain: e.value.value,
                  selectedValidator: undefined,
                });
              }}
              icon={<Search size="16px" />}
              options={chainList}
            />
          </FormField>
          <FormField label="Validator" htmlFor="validator" name="validator">
            <Select
              placeholder={"Which Validator are you?"}
              value={formSelectValues["selectedValidator"]}
              icon={<Search size="16px" />}
              options={validatorList || []}
            />
          </FormField>
          <FormField
            label="Target Position"
            htmlFor="goal"
            name="goal"
            required
          >
            <TextInput
              placeholder="What target position are you trying to get in?"
              id="text-input-id"
              value={formSelectValues["selectedTargetGoal"]}
            />
          </FormField>
          <Box direction="row" justify="center">
            <Button type="submit" primary label="Submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
