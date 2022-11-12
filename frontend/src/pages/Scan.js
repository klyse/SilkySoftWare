import { SiNfc } from "react-icons/si";
import { Center, chakra, Heading, shouldForwardProp, Stack } from "@chakra-ui/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { isValidMotionProp, motion } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const Scan = () => {
  const [connection, setConnection] = useState(null);

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
      console.log(id);
    });

    setConnection(_connection);
  }, []);

  return (
    <Center paddingTop={10}>
      <ChakraBox
        animate={{
          scale: [1, 1.1, 1]
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}>

      <Stack
      >
        <SiNfc size="150px" onClick={(c) => console.log(c)} />
        <Heading textAlign="center">Scan Tag</Heading>
      </Stack>
      </ChakraBox>
    </Center>
  );
};
