import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Text,
  FormLabel,
  FormControl,
  Input,
  HStack,
  Checkbox,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

const Signup = () => {
  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[20, "1vh"]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <VStack spacing={4} align="flex-start" w="full">
        <VStack spacing={1} align={["flex-start", "center"]} w="full">
          <Heading>Sign Up</Heading>
          <Text>Enter your e-mail and password to sign up</Text>
        </VStack>

        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input rounded="none" variant="filled" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input rounded="none" variant="filled" type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>Re-enter Password</FormLabel>
          <Input rounded="none" variant="filled" type="password" />
        </FormControl>
        <HStack alignSelf={"end"}>
          <Link to="/login">
            <Button variant="link" colorScheme="blue">
              Login instead
            </Button>
          </Link>
        </HStack>
        <HStack alignSelf={"end"}>
          <Button
            rounded="none"
            colorScheme="blue"
            w={["full", "auto"]}
            alignSelf="end"
          >
            Sign Up
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Signup;
