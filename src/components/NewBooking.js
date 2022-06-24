import React, { useState } from "react";
import { firebase } from "../firebase-config";
import { AddBooking } from "../firebase/AddBooking";
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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";

const NewBooking = () => {
  const [facility, setFacility] = useState("");
  const date = new Date();
  const [matric, setMatric] = useState("");
  const [purpose, setPurpose] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const uid = firebase.auth().currentUser.uid;

  const makeBooking = async () => {
    await AddBooking(uid, facility, date, matric, numOfPeople, purpose);
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
          <Heading>Make a Booking</Heading>
          <Text>Enter your booking details</Text>
        </VStack>
        <HStack>
          <VStack>
            <FormControl isRequired>
              <FormLabel htmlFor="facility">Choose a Facility</FormLabel>
              <Select
                id="facility"
                placeholder="Select facility"
                onChange={(e) => {
                  setFacility(e.target.value);
                }}
              >
                <option>Badminton Court</option>
                <option>Music Room</option>
              </Select>
            </FormControl>
            {/* <FormControl isRequired>
              <FormLabel htmlFor="matric">Matric No</FormLabel>
              <Input
                id="matric"
                placeholder="Matric No"
                onChange={(e) => {
                  setMatric(e.target.value);
                }}
              />
            </FormControl> */}
            <FormControl isRequired>
              <FormLabel htmlFor="purpose">Purpose</FormLabel>
              <Input
                id="purpose"
                placeholder="Purpose"
                onChange={(e) => {
                  setPurpose(e.target.value);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="amount">Number of People</FormLabel>
              <NumberInput
                max={50}
                min={1}
                onChange={(e) => {
                  setNumOfPeople(e);
                }}
              >
                <NumberInputField id="amount" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
          <VStack>
            <FormControl isRequired>
              <FormLabel htmlFor="startTime">Date</FormLabel>
              <DatePicker
                placeholder="Date"
                name="date"
                onChange={(date: string) => console.log(date)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="startTime">Start Time</FormLabel>
              <Select
                id="startTime"
                placeholder="Start Time"
                // onChange={(e) => {
                //   setFacility(e.target.value);
                // }}
              >
                <option>0900</option>
                <option>1000</option>
                <option>1100</option>
                <option>1200</option>
                <option>1300</option>
                <option>1400</option>
                <option>1500</option>
                <option>1600</option>
                <option>1700</option>
                <option>1800</option>
                <option>1900</option>
                <option>2000</option>
                <option>2100</option>
                <option>2200</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="endTime">End Time</FormLabel>
              <Select
                id="endTime"
                placeholder="End Time"
                // onChange={(e) => {
                //   setFacility(e.target.value);
                // }}
              >
                <option>0900</option>
                <option>1000</option>
                <option>1100</option>
                <option>1200</option>
                <option>1300</option>
                <option>1400</option>
                <option>1500</option>
                <option>1600</option>
                <option>1700</option>
                <option>1800</option>
                <option>1900</option>
                <option>2000</option>
                <option>2100</option>
                <option>2200</option>
              </Select>
            </FormControl>
          </VStack>
        </HStack>
        <HStack alignSelf={"end"}>
          <Button
            onClick={makeBooking}
            rounded="none"
            colorScheme="blue"
            w={["full", "auto"]}
            alignSelf="end"
          >
            Book
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default NewBooking;
