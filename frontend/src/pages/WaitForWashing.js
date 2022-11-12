import { Center, Spinner, Stack, Text } from "@chakra-ui/react";

import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WaitForWashing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const _connection = new HubConnectionBuilder()
      .withUrl("http://172.20.10.2:5001/tags/scan-hub")
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
  }, [navigate]);

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
          onClick={() => navigate("/WashingResult")}
        />
        <Text textAlign="center">Wash in progress. Waiting for results.</Text>
      </Stack>
    </Center>
  );
};
