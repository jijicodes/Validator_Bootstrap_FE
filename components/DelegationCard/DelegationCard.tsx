import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  Image,
  SystemStyleObject,
  Text,
  useColorModeValue,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import {
  chakraComponents,
  ControlProps,
  GroupBase,
  OptionBase,
  OptionProps,
} from "chakra-react-select";
import React, { useEffect, useRef, useState } from "react";
import { CgArrowsExchangeV } from "react-icons/cg";

interface dataType extends OptionBase {
  label: string;
  value: string;
  imgSrc?: string;
  ibc?: {
    source_channel?: string;
    dst_channel?: string;
    source_denom?: string;
  };
  selectedAssetInfo?: {};
}

const FromToken = ({
  setFromItem,
  tokenInputValue,
  selectedAssetInfo,
}: {
  data: dataType[];
  fromItem: dataType | undefined;
  setFromItem: (value: dataType) => void;
  toItem: dataType | undefined;
  setToItem: (value: dataType) => void;
  tokenInputValue: string;
  selectedAssetInfo: {};
}) => {
  const [checked, setChecked] = useState([false, false]);
  const [checkedItems, setCheckedItems] = useState([
    {
      label: "MAX",
      id: "max",
      lightBg: "blackAlpha.300",
      darkBg: "whiteAlpha.300",
    },
    {
      label: "HALF",
      id: "half",
      lightBg: "blackAlpha.300",
      darkBg: "whiteAlpha.300",
    },
  ]);
  const fromMenuRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, onToggle, onClose } = useDisclosure();

  const AvailableCheckbox = ({
    label,
    id,
    lightBg,
    darkBg,
    index,
  }: {
    label: string;
    id: string;
    lightBg: string;
    darkBg: string;
    index: number;
  }) => {
    return (
      <Button
        id={id}
        variant="unstyled"
        fontSize="xs"
        bg={useColorModeValue(lightBg, darkBg)}
        color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
        borderRadius="md"
        fontWeight="semibold"
        _focus={{
          boxShadow: "none",
        }}
        onClick={(e) => {
          if (e.currentTarget.id === id) {
            setChecked((pre) => {
              const newArr = pre.map((v, i) => {
                if (i === index) return !v;
                return false;
              });
              return newArr;
            });
          }
        }}
        h={7}
        w={12}
      >
        {label}
      </Button>
    );
  };

  useEffect(() => {
    setCheckedItems((pre) => {
      const newItems = pre.map(({ lightBg, darkBg, ...rest }, i) => ({
        ...rest,
        lightBg: checked[i] ? "primary.100" : "blackAlpha.300",
        darkBg: checked[i] ? "primary.800" : "whiteAlpha.300",
      }));
      return newItems;
    });
  }, [checked]);
  useOutsideClick({
    ref: fromMenuRef,
    handler: () => onClose(),
  });

  return (
    <Box
      minW="lg"
      ref={fromMenuRef}
      position="relative"
      bg={useColorModeValue("gray.100", "gray.700")}
      borderRadius="xl"
      boxShadow={isOpen ? "0 0 20px -8px rgba(105, 88, 164, 0.5)" : "none"}
      p={6}
    >
      <Flex
        position="relative"
        justify="space-between"
        flexDirection={{ base: "column", sm: "row" }}
        align={{ base: "start", sm: "center" }}
        mb={4}
      >
        <Text fontSize={{ base: "md", sm: "lg" }} fontWeight="bold">
          Delegation
        </Text>
        <Flex
          maxW={{ sm: "2xs" }}
          w="full"
          justify="space-between"
          align="center"
        >
          <Text fontSize={{ base: "md", sm: "lg" }} fontWeight="bold">
            Available
          </Text>
          <Text
            fontSize={{ base: "md", sm: "lg" }}
            fontWeight="bold"
            color="primary.300"
          >
            0.2186
          </Text>
          {checkedItems.map(({ label, id, lightBg, darkBg }, index) => (
            <AvailableCheckbox
              label={label}
              id={id}
              lightBg={lightBg}
              darkBg={darkBg}
              index={index}
            />
          ))}
        </Flex>
      </Flex>
      <Flex align="center" maxW="full" h="fit-content">
        <Button
          flex={2}
          variant="unstyled"
          w="fit-content"
          h="fit-content"
          whiteSpace="normal"
          _focus={{ boxShadow: "none" }}
          onClick={onToggle}
          mr={2}
        >
          <Flex align="center">
            <Box
              minW={{ base: 12, sm: 20 }}
              minH={{ base: 12, sm: 20 }}
              maxW={{ base: 12, sm: 20 }}
              maxH={{ base: 12, sm: 20 }}
              w="full"
              h="full"
              borderRadius="full"
              mr={{ base: 2, sm: 4 }}
            >
              <Image
                alt="logo"
                src={
                  selectedAssetInfo?.logo_URIs?.png ||
                  selectedAssetInfo?.logo_URIs?.svg
                }
              />
            </Box>
            <Text
              fontSize={{ base: "xl", sm: "3xl" }}
              fontWeight="bold"
              textAlign="start"
            >
              {selectedAssetInfo?.symbol}
            </Text>
          </Flex>
        </Button>

        <Box flex={1}>
          <Editable
            variant="unstyled"
            fontSize={{ base: "lg", sm: "2xl" }}
            fontWeight="bold"
            textAlign="end"
            color={
              tokenInputValue === "0"
                ? useColorModeValue("blackAlpha.700", "whiteAlpha.700")
                : useColorModeValue("blackAlpha.800", "whiteAlpha.800")
            }
            mb={{ base: 1, sm: 2 }}
            placeholder="0"
          >
            <EditablePreview />
            <EditableInput
              type="number"
              min="0"
              defaultValue="0"
              onChange={(e) => {
                const value = e.target.value;
                const floatRegex =
                  /(0{0,1}[.]d*)(d+([.]d*)?(e[+-]?d+)?|[.]d+(e[+-]?d+)?)/g;
                const floatCheck = value.match(floatRegex);
                if (floatCheck !== null) {
                  value;
                  return value;
                }

                // setTokenInputValue(parseFloat(value).toString());
                console.log(parseFloat(value).toString());
                // return (e.target.value = parseFloat(value).toString());
              }}
              _focus={{ boxShadow: "none" }}
            />
          </Editable>
          <Text
            fontSize={{ sm: "xl" }}
            textAlign="end"
            fontWeight="bold"
            color={
              tokenInputValue === "0"
                ? useColorModeValue("blackAlpha.600", "whiteAlpha.600")
                : useColorModeValue("blackAlpha.700", "whiteAlpha.700")
            }
            mb={0}
          >
            ≈$0
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default FromToken;
