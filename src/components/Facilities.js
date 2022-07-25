import React from "react";
import { Link } from "react-router-dom";
import {
  SimpleGrid,
  Box,
  Image,
} from "@chakra-ui/react";

const Facilities = () => {

 

  return (
    <>
      <SimpleGrid columns={[2, null, 2]} spacing='40px'>
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='lg' rounded='md' bg='white'>
          <Image boxSize='auto' src={"https://contents.mediadecathlon.com/s912306/k$f2521106f50bee3492957a3b57ea70ad/1180x0/300pt254/600xcr392/default.jpeg?format=auto&quality=80"} 
          alt={"https://contents.mediadecathlon.com/s912306/k$f2521106f50bee3492957a3b57ea70ad/1180x0/300pt254/600xcr392/default.jpeg?format=auto&quality=80"} />
          <Box
            mt='1'
            fontWeight='bold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {"Badminton Court"}
          </Box>
          Availability: 3 courts @4pax
        </Box>
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='lg' rounded='md' bg='white'>
          <Image boxSize='auto' src={"https://img.tagvenue.com/upload/24/92/24998-studio-live-room-jamming-room.jpg"} alt={"https://img.tagvenue.com/upload/24/92/24998-studio-live-room-jamming-room.jpg"} />
          <Box
            mt='1'
            fontWeight='bold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {"Music Room"}
          </Box>
          Availability: 2 rooms @4pax   
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Facilities;
