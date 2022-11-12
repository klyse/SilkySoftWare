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

  const [connection, setConnection] = useState(null);
  const [scanned, setScanned] = useBoolean();

  fetch("http://localhost:5001/tags");

  useEffect(() => {
    const _connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5001/tags/scan-hub")
      .configureLogging(LogLevel.Information)
      .build();

    async function start() {
      try {
        await _connection.start();
        console.log("SignalR Connected.");
      } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
      }
    }

    start();

    _connection.on("scanned", (id) => {
      setScanned.on();
    });

    setConnection(_connection);
  }, [setScanned]);

  useEffect(() => {
    if (scanned)
      setTimeout(() => {
        navigate("/details");
      }, 3000);
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
      >
        {!scanned && (
          <Stack>
            <SiNfc size="150px" onClick={(c) => navigate("/details")} />
            <Heading textAlign="center">Scan Tag</Heading>
          </Stack>
        )}
        {scanned && (
          <Stack>
            <Spinner size="150px" onClick={() => navigate("/details")} />
            <Heading textAlign="center">
              Successfully scanned NFC. Reading from database
            </Heading>
          </Stack>
        )}
      </ChakraBox>
    </Center>
  );
};
