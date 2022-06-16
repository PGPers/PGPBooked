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
} from "@chakra-ui/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const reset = async (event) => {
    event.preventDefault();
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("Reset password email sent");
      })
      .catch((e) => {
        console.log(e.message);
      });
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
          <Heading>Forgot Password</Heading>
          <Text>Enter your e-mail</Text>
        </VStack>

        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input rounded="none" variant="filled" onChange={(e) => setEmail(e.target.value)}/>
        </FormControl>
        <HStack w="full" justify="space-between">
          <Link to="/login">
            <Button variant="link" colorScheme="blue">
              Login instead?
            </Button>
          </Link>
        </HStack>
        <HStack alignSelf={"end"}>
          <Button
            onClick={reset}
            rounded="none"
            colorScheme="blue"
            w={["full", "auto"]}
            alignSelf="end"
          >
            Send Password Reset
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ForgotPassword;
