import { React, useState, useEffect } from "react";
import { firebase } from "../firebase-config";
import { AddBooking } from "../firebase/AddBooking";
import {
  Alert,
  AlertIcon,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const NewBooking = () => {
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [matric, setMatric] = useState("");
  const [purpose, setPurpose] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const uid = firebase.auth().currentUser.uid;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const makeBooking = async () => {
    await AddBooking(
      uid,
      facility,
      date,
      matric,
      numOfPeople,
      purpose,
      startTime,
      endTime
    );
    navigate("../mybooking");
  };

  let availableTimings = {};
  const changeDate = async (e, facility) => {
    setDate(e);
    const date = '20220705';
    const availRef = firebase
      .firestore()
      .doc(`facilities/${facility}/availability/${date}`);
    const availSnap = await availRef.get();
    if (availSnap.exists) {
      availableTimings = availSnap.data();
      console.log(availableTimings);
    }
  };

  useEffect(() => {
    let availableTimings = {};
    const changeDate = async (e, facility) => {
      setDate(e);
      const date = '20220705';
      const availRef = firebase
        .firestore()
        .doc(`facilities/${facility}/availability/${date}`);
      const availSnap = await availRef.get();
      if (availSnap.exists) {
        availableTimings = availSnap.data();
        console.log(availableTimings);
      }
    };
    changeDate(1, 'music1');
  });

  return (
    <div>
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
                  onChange={changeDate}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="startTime">Start Time</FormLabel>
                <Select
                  id="startTime"
                  placeholder="Start Time"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
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
          {error ? (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
          <HStack alignSelf={"end"}>
            <Button
              onClick={() => {
                if (facility === "" || purpose === "" || numOfPeople === "" || date === "" || startTime === "" || endTime === "") {
                  setError("Please fill all fields");
                } else if (moment(date,"DD/MM/YYYY").format("YYYYMMDD") < moment().add(1,'days').format("YYYYMMDD")) {
                  setError("Date has passed");
                } else if (moment(date,"DD/MM/YYYY").format("YYYYMMDD") > moment().add(13,'days').format("YYYYMMDD")) {
                  setError("Please book within 2 weeks from today");
                } else if (parseInt(endTime) - parseInt(startTime) < 100) {
                  setError("Invalid time range");
                } else if (parseInt(endTime) - parseInt(startTime) > 300) {
                  setError("Max booking duration: 3 hours")
                } else {
                  onOpen();
                }
              }}
              rounded="none"
              colorScheme="blue"
              w={["full", "auto"]}
              alignSelf="end"
            >
              Book
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Booking Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div>
                    <HStack>
                      <VStack align={"left"}>
                        <div>Facility: </div>
                        <div>Purpose: </div>
                        <div>Number of People</div>
                        <div>Date: </div>
                        <div>Start Time: </div>
                        <div>End Time: </div>
                      </VStack>
                      <VStack align={"left"}>
                        <div> : {facility}</div>
                        <div> : {purpose}</div>
                        <div> : {numOfPeople}</div>
                        <div> : {date}</div>
                        <div> : {startTime}</div>
                        <div> : {endTime}</div>
                      </VStack>
                    </HStack>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    colorScheme="blue" 
                    onClick={() => {
                      makeBooking();
                      onClose();
                    }}
                  >
                    Confirm Booking
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </HStack>
        </VStack>
      </Box>
    </div>
  );
};

export default NewBooking;
