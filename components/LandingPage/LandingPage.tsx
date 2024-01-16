import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

export const LandingPage = () => {
  return (
    <Flex direction={"column"}>
      <Heading mb={4} alignSelf="center">
        Validator Bootstrap
      </Heading>
      <SimpleGrid alignSelf="center" spacing={4}>
        <Card
          align="center"
          direction={"column"}
          justify={"center"}
          variant={"filled"}
        >
          <CardHeader>
            <Heading size="md">Create a new campaign</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Validators, We are here to help you to get in the active chain you
              want to be in. Go ahead create a new campaign.
            </Text>
          </CardBody>
          <CardFooter>
            <NextLink href="/create-campaign-form">
              <Button colorScheme="teal">Create Campaign</Button>
            </NextLink>
          </CardFooter>
        </Card>
        <Card
          align="center"
          direction={"column"}
          justify={"center"}
          variant={"filled"}
        >
          <CardHeader>
            <Heading size="md">Participate to pledge</Heading>
          </CardHeader>
          <CardBody>
            <Text>Individuals, you can participate to pledge the campaign</Text>
          </CardBody>
          <CardFooter>
            <NextLink href="/campaigns">
              <Button colorScheme="teal">Pledge</Button>
            </NextLink>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};

export default LandingPage;
