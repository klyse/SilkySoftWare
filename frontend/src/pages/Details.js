import { HStack, Image, Stack, Text } from "@chakra-ui/react";
import Wash from "../assets/Waschen_30.svg";
import Dry from "../assets/Trommeltrocknen_1.svg";
import Bleach from "../assets/Nicht_bleichen_v2.svg";
import Iron from "../assets/Nicht_bügeln.svg";

export const Details = () => {
  return (
    <Stack margin={3}>
      <Text>Details</Text>
      <HStack bg="gray.200" padding={1} borderRadius={5}>
        <Image src={Wash} w="50px" />
        <Image src={Dry} w="50px" />
        <Image src={Bleach} w="50px" />
        <Image src={Iron} w="50px" />
      </HStack>

      <HStack>
        <Text></Text>
      </HStack>
    </Stack>
  );
};
