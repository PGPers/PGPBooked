import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Button, Center, Container, VStack, Link } from "@chakra-ui/react";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Container maxW="vw" maxH="vh">
      <Center>
        <VStack>
          <Logo fontSize="72pt" textShadow="0px 1px 3px #00000033" />
          <Button
          onClick={() => navigate("/login")}
          colorScheme="whatsapp"
          size="lg">
            Start Booking!
          </Button>
          <Link href="https://github.com/PGPers/PGPBooked" target="_blank">
            Check Our Github
          </Link>
        </VStack>
      </Center>
    </Container>
  );
};

export default Dashboard;
