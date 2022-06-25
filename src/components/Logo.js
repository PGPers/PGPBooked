import { Text, chakra } from "@chakra-ui/react";
import "@fontsource/league-spartan/700.css"; 

export default function Logo({ ...props }) {
  return (
    <Text fontFamily="League Spartan" {...props}>
      <chakra.span color="blue.600">PGP</chakra.span>
      <chakra.span color="blue.300">Booked</chakra.span>
    </Text>
  );
}