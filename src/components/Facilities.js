import React from "react";
import {
  SimpleGrid,
  Box,
  Image,
  Text,
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
            <Text fontSize='3xl'>Badminton Court</Text>
          </Box>
          <Text fontSize='xl'>Availability: 3 Courts</Text>
          <Text fontSize='xl'>Occupancy: 4 pax per court</Text>
          <Text fontSize='xl'>Max booking duration: 2 hrs</Text>
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
            <Text fontSize='3xl'>Music Room</Text>
          </Box>
          <Text fontSize='xl'>Availability: 2 Rooms</Text>
          <Text fontSize='xl'>Occupancy: 4 pax per room</Text>
          <Text fontSize='xl'>Max booking duration: 2 hrs</Text>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Facilities;
