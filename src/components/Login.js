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

const Login = () => {
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
          <Heading>Login</Heading>
          <Text>Enter your e-mail and password to login</Text>
        </VStack>

        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input rounded="none" variant="filled" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input rounded="none" variant="filled" type="password" />
        </FormControl>
        <HStack w="full" justify="space-between">
          <Checkbox>Remember me.</Checkbox>
          <Button variant="link" colorScheme="blue">
            Forget Password?
          </Button>
        </HStack>
        <HStack alignSelf={"end"}>
          <Link to="/signup">
            <Button
              variant="ghost"
              rounded="none"
              colorScheme="blue"
              w={["full", "auto"]}
              alignSelf="end"
            >
              Sign Up
            </Button>
          </Link>
          <Button
            rounded="none"
            colorScheme="blue"
            w={["full", "auto"]}
            alignSelf="end"
          >
            Login
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
