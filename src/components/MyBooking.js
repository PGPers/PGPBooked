import React from "react";
import { firebase } from "../firebase-config";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

const MyBooking = () => {
  const uid = firebase.auth().currentUser.uid;
  const [isBusy, setBusy] = useState(true);
  const [bookings, setBookings] = useState();
  // const bookings = [
  //   {
  //     facility: "test",
  //   },
  //   {
  //     facility: "test2",
  //   },
  // ];

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

  return (
    <div>
      <TableContainer>
        <Table variant="simple" textAlign={"center"}>
          <TableCaption>My PGP Bookings</TableCaption>
          <Thead>
            <Tr>
              <Th>Booking ID</Th>
              <Th>Facility</Th>
              <Th>Purpose</Th>
              <Th>No. of People</Th>
              <Th>Date</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th>Booking Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings &&
              bookings.map((item) => {
                return (
                  <tr>
                    <td>{item.bookid}</td>
                    <td>{item.facility}</td>
                    <td>{item.purpose}</td>
                    <td>{item.numOfPeople}</td>
                    <td>{item.date}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>CONFIRMED</td>
                  </tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyBooking;
