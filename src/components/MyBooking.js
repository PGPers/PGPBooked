import React from "react";
import { firebase } from "../firebase-config";
import {
  HStack,
  Button,
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
      const bookRef = firebase.firestore().collection(`users/${uid}/bookings`);
      const bookSnap = await bookRef.get();
      bookSnap.forEach((doc) => {
        console.log(doc.id, doc.data());
        dummyBookings.push(doc.data());
      });
      setBookings(dummyBookings);
      setBusy(false);
      console.log(bookings);
    }
    fetchData();
  }, []);

  const convertDate = (date) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(date.seconds);
    return t.toLocaleString();
  };

  return (
    <div>
      <TableContainer>
        <Table variant="simple" textAlign={"center"}>
          <TableCaption>My PGP Bookings</TableCaption>
          <Thead>
            <Tr>
              <Th>Booking ID</Th>
              <Th>Matric</Th>
              <Th>Facility</Th>
              <Th>Purpose</Th>
              <Th>No. of People</Th>
              <Th>Date Booked</Th>
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
                    <td>{item.matric} </td>
                    <td>{item.facility}</td>
                    <td>{item.purpose}</td>
                    <td>{item.numOfPeople}</td>
                    <td>{convertDate(item.date)}</td>
                    <td>0700</td>
                    <td>0900</td>
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
