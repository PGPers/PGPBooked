import React from "react";
import { firebase } from "../firebase-config";
import {
  HStack,
  Button,
} from "@chakra-ui/react";

const MyBooking = () => {
  const uid = firebase.auth().currentUser.uid;
  const viewBooking = async () => {
    const bookings = [];
    const bookRef = firebase.firestore().collection(`users/${uid}/bookings`);
    const bookSnap = await bookRef.get();
    bookSnap.forEach(doc => {
      console.log(doc.id, doc.data());
      bookings.push(doc.data());
    })
    console.log(bookings);
  }
  return (
    <HStack alignSelf={"end"}>
    <Button
      onClick={viewBooking}
      rounded="none"
      colorScheme="blue"
      w={["full", "auto"]}
      alignSelf="end"
    >
      View
    </Button>
  </HStack>
  );
};

export default MyBooking;
