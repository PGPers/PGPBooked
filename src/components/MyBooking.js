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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const MyBooking = () => {
  const uid = firebase.auth().currentUser.uid;
  const [isBusy, setBusy] = useState(true);
  const [bookings, setBookings] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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
