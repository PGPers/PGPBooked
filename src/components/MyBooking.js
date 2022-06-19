import React from "react";
import { firebase } from "../firebase-config";
import { ViewMyBooking } from "../firebase/ViewMyBooking";
import {
  HStack,
  Button,
} from "@chakra-ui/react";

const MyBooking = () => {
  const uid = firebase.auth().currentUser.uid;
  const viewBooking = async () => {
    ViewMyBooking(uid);
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
      Book
    </Button>
  </HStack>
  );
};

export default MyBooking;
