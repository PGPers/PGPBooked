import React from "react";
import { firebase } from "../firebase-config";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DatePicker } from "chakra-ui-date-input";
import { ChangeBooking } from "../firebase/ChangeBooking";
import moment from "moment";

const MyBooking = () => {
  const uid = firebase.auth().currentUser.uid;
  const [isBusy, setBusy] = useState(true);
  const [bookings, setBookings] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [openChange, setOpenChange] = useState(false);
  const [startTime, setStartTime] = useState("0900");
  const [endTime, setEndTime] = useState("0900");
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [onDeleteItem, setOnDeleteItem] = useState("");
  const [onChangeItem, setOnChangeItem] = useState({});
  const today = moment().format('DD/MM/YYYY');
  const [date, setDate] = useState(today);
  const [refreshKey, setRefreshKey] = useState(0);
  const { isOpen: timingIsOpen, onOpen: timingOnOpen, onClose: timingOnClose } = useDisclosure();
  const { isOpen: endtimingIsOpen, onOpen: endtimingOnOpen, onClose: endtimingOnClose } = useDisclosure();
  const [timings, setTimings] = useState("");

  useEffect(() => {
    async function fetchData() {
      const dummyBookings = [];
      const bookRef = firebase
        .firestore()
        .collection(`users/${uid}/bookings`)
        .orderBy("dateTime", "desc");
      const bookSnap = await bookRef.get();
      bookSnap.forEach((doc) => {
        console.log(doc.id, doc.data());
        dummyBookings.push(doc.data());
      });
      setBookings(dummyBookings);
      setBusy(false);
    }
    fetchData();
  }, [refreshKey]);

  const makeChange = async (item) => {
    const bookid = item.bookid;
    console.log(`make change to ${bookid}`);
    await ChangeBooking(bookid, uid, date, numOfPeople, startTime, endTime);
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const cancelBooking = async (item) => {
    console.log(item);
    const bookid = item.bookid;
    await firebase.firestore().doc(`users/${uid}/bookings/${bookid}`).update({
      status: "CANCELED",
    });
    await firebase.firestore().doc(`bookings/${bookid}`).update({
      status: "CANCELED",
    });
    setRefreshKey((oldKey) => oldKey + 1);
    console.log(refreshKey);
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple" textAlign={"center"}>
          <TableCaption>My PGP Bookings</TableCaption>
          <Thead>
            <Tr>
              <Th>Booking ID</Th>
              <Th>Facility</Th>
              <Th>No. of People</Th>
              <Th>Date</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Status</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings &&
              bookings.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.bookid}</Td>
                    <Td>{item.facility}</Td>
                    <Td>{item.numOfPeople}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.startTime}</Td>
                    <Td>{item.endTime}</Td>
                    <Td>{item.status}</Td>
                    <Td>
                      <Button
                        disabled={item.status === "CANCELED"}
                        onClick={() => {
                          setOpenChange(true);
                          setOnChangeItem(item);
                        }}
                        colorScheme="green"
                        size="sm"
                      >
                        Change
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        disabled={item.status === "CANCELED"}
                        onClick={() => {
                          onOpen();
                          setOnDeleteItem(item);
                        }}
                        colorScheme="red"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* This is Alert Dialog for CANCEL */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Booking
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  cancelBooking(onDeleteItem);
                  onClose();
                }}
                ml={3}
              >
                Cancel Booking
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* This is modal Dialog for CHANGE */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={openChange}
        onClose={() => setOpenChange(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <i>Please fill all fields</i>
            <HStack>
              <VStack>
                <FormControl isRequired>
                  <FormLabel htmlFor="startTime">Date</FormLabel>
                  <DatePicker
                    defaultValue={today}
                    name="date"
                    onChange={(e) => setDate(e)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="amount">Number of People</FormLabel>
                  <NumberInput
                    defaultValue={1}
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
                  <FormLabel htmlFor="startTime">Start Time</FormLabel>
                  <Button onClick={() => {timingOnOpen()}} width={{ base: '100%'}}>{startTime}</Button>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="endTime">End Time</FormLabel>
                  <Button onClick={() => {endtimingOnOpen()}} width={{ base: '100%'}}>{endTime}</Button>
                </FormControl>
              </VStack>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setOpenChange(false)}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                makeChange(onChangeItem);
                setOpenChange(false);
              }}
            >
              Change Booking
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
                            let nowSlot = parseInt(key) - 100;
                            if (key < "1400")
                            {
                              if ((key-startTime) > 0 && (key-startTime) <= 200)
                              {
                                let nextSlot = parseInt(key) - 100;
                                if ((key-startTime) == 200 && timings[nextSlot] == 0){
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
                              if (key >= "1400" && key < "1800")
                              {
                                if ((key-startTime) > 0 && (key-startTime) <= 200)
                                {
                                  let nextSlot = parseInt(key) - 100;
                                  if ((key-startTime) == 200 && timings[nextSlot] == 0){
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
                              if (key >= "1800")
                              {
                                if ((key-startTime) > 0 && (key-startTime) <= 200)
                                {
                                  let nextSlot = parseInt(key) - 100;
                                  if ((key-startTime) == 200 && timings[nextSlot] == 0){
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
    </div>
  );
};

export default MyBooking;
