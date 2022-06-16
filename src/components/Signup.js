import React, { useState } from "react";
import { firebase } from "../firebase-config";
import { Link } from "react-router-dom";
import { AddUser } from "../firebase/AddUser";
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

function passwordTooShort(password) {
  return password.length < 6;
}
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setRegisterFirstName] = useState("");
  const [lastName, setRegisterLastName] = useState("");
  const [phone, setRegisterPhone] = useState("");

  const register = async () => {
    if (!isValidEmail(registerEmail)) {
      console.log("Email is not valid");
    } else if (registerPassword !== confirmPassword) {
      console.log("Password does not match");
    } else if (passwordTooShort(registerPassword)) {
      console.log("Weak password: must at least 6 characters long");
    } else {
      try {
        await firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(async (response) => {
          response.user.sendEmailVerification();
          console.log(response.user);
          await AddUser(response.user.uid, response.user.email, firstName, lastName, phone);
        })
        firebase.auth().signOut();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

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
          <Input rounded="none" variant="filled" onChange={(e) => {setRegisterEmail(e.target.value)}}/>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input rounded="none" variant="filled" type="password" onChange={(e) => {setRegisterPassword(e.target.value)}}/>
        </FormControl>
        <FormControl>
          <FormLabel>Re-enter Password</FormLabel>
          <Input rounded="none" variant="filled" type="password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
        </FormControl>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input rounded="none" variant="filled" onChange={(e) => {setRegisterFirstName(e.target.value)}}/>
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input rounded="none" variant="filled" onChange={(e) => {setRegisterLastName(e.target.value)}}/>
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input rounded="none" variant="filled" onChange={(e) => {setRegisterPhone(e.target.value)}}/>
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
            onClick={register}
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
