import React, { useState } from "react";
import { firebase } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
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
  Alert,
  AlertIcon,
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePhone = (e) => {
    const result = e.target.value.replace(/\D/g, '');
    setRegisterPhone(result);
  }

  const register = async () => {
    if (!isValidEmail(registerEmail)) {
      console.log("Email is not valid");
      setError("Email is not valid");
    } else if (registerPassword !== confirmPassword) {
      console.log("Password does not match");
      setError("Password does not match");
    } else if (passwordTooShort(registerPassword)) {
      console.log("Weak password: must at least 6 characters long");
      setError("Weak password: must at least 6 characters long");
    } else if (firstName === "" || lastName === "") {
      setError("Please fill in your name");
    } else if (phone === "") {
      setError("Please fill in your phone number");
    } else {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(registerEmail, registerPassword)
          .then(async (response) => {
            response.user.sendEmailVerification();
            console.log(response.user);
            await AddUser(
              response.user.uid,
              response.user.email,
              firstName,
              lastName,
              phone
            );
          });
        firebase.auth().signOut();
        navigate("/login");
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
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
          <Heading>Sign Up</Heading>
          <Text>Enter your e-mail and password to sign up</Text>
        </VStack>
        <HStack spacing={10}>
          <VStack>
            <FormControl>
              <FormLabel htmlFor="email">E-mail Address</FormLabel>
              <Input
                id="registerEmail"
                type="email"
                placeholder="Email Address"
                value={registerEmail}
                border={["none", "1px"]}
                borderColor={["", "gray.300"]}
                borderRadius={10}
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="registerPassword"
                type="password"
                placeholder="Password"
                variant="filled"
                value={registerPassword}
                border={["none", "1px"]}
                borderColor={["", "gray.300"]}
                borderRadius={10}
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Re-enter Password</FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                variant="filled"
                value={confirmPassword}
                border={["none", "1px"]}
                borderColor={["", "gray.300"]}
                borderRadius={10}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormControl>
          </VStack>
          <VStack>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                id="firstName"
                type="name"
                placeholder="First Name"
                variant="filled"
                value={firstName}
                border={["none", "1px"]}
                borderColor={["", "gray.300"]}
                borderRadius={10}
                onChange={(e) => {
                  setRegisterFirstName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                id="lastName"
                type="name"
                placeholder="Last Name"
                variant="filled"
                value={lastName}
                border={["none", "1px"]}
                borderColor={["", "gray.300"]}
                borderRadius={10}
                onChange={(e) => {
                  setRegisterLastName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                id="phone"
                type="phoneNumber"
                placeholder="Phone Number"
                variant="filled"
                value={phone}
                border={["none", "1px"]}
                borderColor={["", "gray.300"]}
                borderRadius={10}
                onChange={handlePhone}
              />
            </FormControl>
          </VStack>
        </HStack>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
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
