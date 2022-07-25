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
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
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
  const { isOpen: timingIsOpen, onOpen: timingOnOpen, onClose: timingOnClose } = useDisclosure();
  const { isOpen: endtimingIsOpen, onOpen: endtimingOnOpen, onClose: endtimingOnClose } = useDisclosure();
  const [error, setError] = useState("");
  const [timings, setTimings] = useState("");

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
    const changeDate = async () => {
      if (moment(date,"DD/MM/YYYY").format("YYYYMMDD") < moment().add(1,'days').format("YYYYMMDD")) {
        setError("Date has passed");
      } 
      // else if (purpose.length()>10){
      //   setError("Purpose must be less then 10 characters");
      // }
      else if (facility !== "") {
        setError("");
        const dateformat = moment(date,"DD/MM/YYYY").format("YYYYMMDD");
        const availRef = firebase
          .firestore()
          .doc(`facilities/${facility}/availability/${dateformat}`);
        const availSnap = await availRef.get();
        if (availSnap.exists) {
          availableTimings = availSnap.data();
          setTimings(availableTimings);
        }
      }
    };
    changeDate();
  }, [date, facility]);

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
                  // max={50}
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
                <Button onClick={() => {timingOnOpen()}} width={{ base: '100%'}}>{startTime}</Button>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="endTime">End Time</FormLabel>
                <Button onClick={() => {endtimingOnOpen()}} width={{ base: '100%'}}>{endTime}</Button>
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
                } else if (!Number.isInteger(parseFloat(numOfPeople)) || parseInt(numOfPeople) < 0) {
                  setError("Invalid number of people");
                } else if (parseInt(endTime) - parseInt(startTime) < 100) {
                  setError("Invalid time range");
                } else if (parseInt(endTime) - parseInt(startTime) > 300) {
                  setError("Max booking duration: 3 hours");
                } else if (purpose.length > 20) {
                  setError("Purpose must be less than 20 characters");
                } else if (numOfPeople > 4) {
                  setError(`${facility} max capacity is 4 person`);
                } else if (numOfPeople % 10 !== 0) {
                  setError("Number of People must be integer!");
                }
                else {
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
            <Modal isOpen={timingIsOpen} onClose={timingOnClose}>
              <ModalOverlay />
              <ModalContent>
              <ModalHeader>Available Timings for {date}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <TableContainer>
                  <Table variant='simple' size="sm">
                    <Tbody>
                        <Tr>
                          {timings && Object.keys(timings).map(key => {
                            if (key < "1400")
                            {
                              if (timings[key] > 0)
                              {
                              return (
                                <Td><Button 
                                id="startTime"
                                onClick={(e) => {
                                  setStartTime(key);
                                  timingOnClose();
                                }}>{key}</Button></Td>
                              );
                              }
                              else
                              {
                                return (
                                  <Td><Button disabled>{key}</Button></Td>
                                );
                              }
                            }
                          })}
                        </Tr>
                        <Tr>
                          {timings && Object.keys(timings).map(key => {
                              if (key >= "1400" && key < "1800")
                              {
                                if (timings[key] > 0)
                                {
                                return (
                                  <Td><Button id="startTime"
                                  onClick={(e) => {
                                    setStartTime(key);
                                    timingOnClose();
                                  }}>{key}</Button></Td>
                                );
                                }
                                else
                                {
                                  return (
                                    <Td><Button disabled>{key}</Button></Td>
                                  );
                                }
                              } 
                            })}
                        </Tr>
                        <Tr>
                          {timings && Object.keys(timings).map(key => {
                              if (key >= "1800")
                              {
                                if (timings[key] > 0)
                                {
                                return (
                                  <Td><Button id="startTime"
                                  onClick={(e) => {
                                    setStartTime(key);
                                    timingOnClose();
                                  }}>{key}</Button></Td>
                                );
                                }
                                else
                                {
                                  return (
                                    <Td><Button disabled>{key}</Button></Td>
                                  );
                                }
                              } 
                            })}
                        </Tr>
                    </Tbody>  
                  </Table>
                </TableContainer>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={timingOnClose}>
                    Close
                  </Button>
                  
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal isOpen={endtimingIsOpen} onClose={endtimingOnClose}>
              <ModalOverlay />
              <ModalContent>
              <ModalHeader>End Time</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <TableContainer>
                  <Table variant='simple' size="sm">
                    <Tbody>
                        <Tr>
                          {timings && Object.keys(timings).map(key => {
                            key = parseInt(key) + 100;
                            let nowSlot = parseInt(key) - 100;
                            if (key < "1500")
                            {
                              if ((key-startTime) > 0 && (key-startTime) <= 200)
                              {
                                let nextSlot = parseInt(key) - 100;
                                if ((key-startTime) === 200 && timings[nextSlot] === 0){
                                  return (
                                    <Td><Button disabled>{key}</Button></Td>
                                  );
                                }
                                else{
                                  return (
                                    <Td><Button id="startTime"
                                    onClick={(e) => {
                                      setEndTime(key);
                                      endtimingOnClose();
                                    }}>{key}</Button></Td>
                                  );
                                }
                              }
                              else
                              {
                                return (
                                  <Td><Button disabled>{key}</Button></Td>
                                );
                              }
                            }
                          })}
                        </Tr>
                        <Tr>
                          {timings && Object.keys(timings).map(key => {
                            key = parseInt(key) + 100;
                              if (key >= "1500" && key < "1900")
                              {
                                if ((key-startTime) > 0 && (key-startTime) <= 200)
                                {
                                  let nextSlot = parseInt(key) - 100;
                                  if ((key-startTime) === 200 && timings[nextSlot] === 0){
                                    return (
                                      <Td><Button disabled>{key}</Button></Td>
                                    );
                                  }
                                  else{
                                    return (
                                      <Td><Button id="startTime"
                                      onClick={(e) => {
                                        setEndTime(key);
                                        endtimingOnClose();
                                      }}>{key}</Button></Td>
                                    );
                                  }
                                }
                                else
                                {
                                  return (
                                    <Td><Button disabled>{key}</Button></Td>
                                  );
                                }
                              } 
                            })}
                        </Tr>
                        <Tr>
                          {timings && Object.keys(timings).map(key => {
                            key = parseInt(key) + 100;
                              if (key >= "1900")
                              {
                                if ((key-startTime) > 0 && (key-startTime) <= 200)
                                {
                                  let nextSlot = parseInt(key) - 100;
                                  if ((key-startTime) === 200 && timings[nextSlot] === 0){
                                    return (
                                      <Td><Button disabled>{key}</Button></Td>
                                    );
                                  }
                                  else{
                                    return (
                                      <Td><Button id="startTime"
                                      onClick={(e) => {
                                        setEndTime(key);
                                        endtimingOnClose();
                                      }}>{key}</Button></Td>
                                    );
                                  }
                                }
                                else
                                {
                                  return (
                                    <Td><Button disabled>{key}</Button></Td>
                                  );
                                }
                              } 
                            })}
                        </Tr>
                    </Tbody>  
                  </Table>
                </TableContainer>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={endtimingOnClose}>
                    Close
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
