import { Center, Spinner, Stack, Text } from "@chakra-ui/react";
import { SiNfc } from "react-icons/si";
import {
  chakra,
  Heading,
  shouldForwardProp,
  useBoolean,
} from "@chakra-ui/react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { isValidMotionProp, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const WaitForWashing = () => {
  const [connection, setConnection] = useState(null);
  const [scanned, setScanned] = useBoolean();
  const navigate = useNavigate();

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
      navigate("/WashingResult");
    });

    setConnection(_connection);
  }, [navigate, setScanned]);

  return (
    <Center paddingTop={10}>
      <Stack>
        <Spinner
          alignSelf="center"
          thickness="6px"
          w="200px"
          h="200px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
        <Text textAlign="center">Wash in progress. Waiting for results.</Text>
      </Stack>
    </Center>
  );
};
