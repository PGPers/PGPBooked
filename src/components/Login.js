import React, { useState } from "react";
import { firebase } from "../firebase-config";
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
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import "./Login.css";

const Login = () => {
  const [email, loginEmail] = useState("");
  const [password, loginPassword] = useState("");
  const isBlankEmail = email === "email";
  const isBlankPassword = password === "password";
  const [error, setError] = useState("");

  const login = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (response) => {
          console.log(response.user);
          console.log(response.data);
          console.log(response.status);
        });
    } catch (error) {
      console.log("Incorrect email or password");
      setError("Incorrect email or password");
    }
  };

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

        <FormControl isInvalid={isBlankEmail}>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            className="input"
            id="email"
            type="email"
            placeholder="Email Address"
            border={["none", "1px"]}
            borderColor={["", "gray.300"]}
            borderRadius={10}
            value={email}
            onChange={(e) => {
              loginEmail(e.target.value);
            }}
          />
          {isBlankEmail ? (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          ) : (
            true
          )}
        </FormControl>

        <FormControl isInvalid={isBlankPassword}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            variant="filled"
            value={password}
            border={["none", "1px"]}
            borderColor={["", "gray.300"]}
            borderRadius={10}
            onChange={(e) => {
              loginPassword(e.target.value);
            }}
          />
          {!isBlankPassword ? (
            true
          ) : (
            <FormErrorMessage>Password is blank.</FormErrorMessage>
          )}
        </FormControl>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
        <HStack w="full" justify="space-between">
          <Link to="/forgotpassword">
            <Button variant="link" colorScheme="blue">
              Forget Password?
            </Button>
          </Link>
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
            onClick={login}
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
