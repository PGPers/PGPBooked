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

const MyBooking = () => {
  const uid = firebase.auth().currentUser.uid;
  const [isBusy, setBusy] = useState(true);
  const [bookings, setBookings] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [openChange, setOpenChange] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");

  const makeChange = async (bookid) => {
    await ChangeBooking(bookid, uid, date, numOfPeople, startTime, endTime);
  };

  useEffect(() => {
    async function fetchData() {
      const dummyBookings = [];
      const bookRef = firebase.firestore().collection(`users/${uid}/bookings`).orderBy('dateTime', 'desc');
      const bookSnap = await bookRef.get();
      bookSnap.forEach((doc) => {
        console.log(doc.id, doc.data());
        dummyBookings.push(doc.data());
      });
      setBookings(dummyBookings);
      setBusy(false);
    }
    fetchData();
  }, []);

  const cancelBooking = async (bookid) => {
    await firebase.firestore().doc(`users/${uid}/bookings/${bookid}`).update({
      status: 'CANCELED'
    });
    await firebase.firestore().doc(`bookings/${bookid}`).update({
      status: 'CANCELED'
    });
  }

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
              bookings.map((item) => {
                return (
                  <Tr>
                    <Td>{item.bookid}</Td>
                    <Td>{item.facility}</Td>
                    <Td>{item.numOfPeople}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.startTime}</Td>
                    <Td>{item.endTime}</Td>
                    <Td>{item.status}</Td>
                    <Td>
                      <Button
                      disabled={item.status === 'CANCELED'}
                      onClick={() => setOpenChange(true)}
                      colorScheme="green"
                      size="sm">
                      Change
                      </Button>
                      <Modal closeOnOverlayClick={false} isOpen={openChange} onClose={() => setOpenChange(false)}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Change Booking</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                          <HStack>
                            <VStack>
                              <FormControl isRequired>
                                <FormLabel htmlFor="startTime">Date</FormLabel>
                                <DatePicker
                                  placeholder="Date"
                                  name="date"
                                  onChange={(e) => setDate(e)}
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
                          </ModalBody>

                          <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={() => setOpenChange(false)}>
                              Close
                            </Button>
                            <Button colorScheme='green' onClick={() => {makeChange(item.bookid); setOpenChange(false);}}>
                              Change Booking
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Td>
                    <Td>
                      <Button
                      disabled={item.status === 'CANCELED'}
                      onClick={onOpen}
                      colorScheme="red"
                      size="sm">
                      Cancel
                      </Button>
                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                              Cancel Booking
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose}>
                                Close
                              </Button>
                              <Button colorScheme='red' onClick={() => {cancelBooking(item.bookid); onClose();}} ml={3}>
                                Cancel Booking
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyBooking;
