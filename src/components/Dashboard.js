import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Button, Center, Container, VStack, Link } from "@chakra-ui/react";
import { firebase } from "../firebase-config";
import { CreateAvailFacility } from "../firebase/CreateAvailFacility";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  const navigate = useNavigate();
  return (
    <Container maxW="vw" maxH="vh">
      <Center>
        <VStack>
          <Logo fontSize="72pt" textShadow="0px 1px 3px #00000033" />
          {loggedIn? <></>:
          <>
            <Button
            onClick={() => navigate("/login")}
            colorScheme="whatsapp"
            size="lg">
              Start Booking!
            </Button>
          </>}
         <a href="https://github.com/PGPers/PGPBooked" target="_blank"><Button colorScheme="red">
              Check Our Github
            </Button></a>
        </VStack>
      </Center>
    </Container>
  );
};

export default Dashboard;
