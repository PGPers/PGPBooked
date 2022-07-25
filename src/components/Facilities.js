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
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='lg' rounded='25' bg='white'>
          <Image boxSize='auto' src={"https://singaporebadminton.org.sg/site/wp-content/uploads/2021/04/171570894_129371942497111_1119041687230091728_n-2.jpg"} 
          alt="badminton court" />
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
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='lg' rounded='25' bg='white'>
          <Image boxSize='auto' src={"https://i.pinimg.com/originals/0b/60/a6/0b60a60dd364952003d8067806700e12.jpg"} alt="music room" />
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
