import { SiNfc } from "react-icons/si";
import {
  Center,
  chakra,
  Heading,
  shouldForwardProp,
  Spinner,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { isValidMotionProp, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const Scan = () => {
  const navigate = useNavigate();
  const [scanned, setScanned] = useBoolean();

  useEffect(() => {
    if (scanned)
      setTimeout(() => {
        navigate("/Details");
      }, 2000);
  }, [navigate, scanned]);

  return (
    <Center paddingTop={10}>
      <ChakraBox
        animate={{
          scale: [1, 1.1, 1],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        onClick={() => setScanned.on()}
      >
        {!scanned && (
          <Stack>
            <SiNfc size="150px" />
            <Heading textAlign="center">Scan Tag</Heading>
          </Stack>
        )}
      </ChakraBox>
      {scanned && (
        <Stack>
          <Center>
            <Spinner
              alignSelf="center"
              thickness="6px"
              w="200px"
              h="200px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
            />
          </Center>
          <Heading textAlign="center">
            Successfully scanned NFC. Reading from database
          </Heading>
        </Stack>
      )}
    </Center>
  );
};
