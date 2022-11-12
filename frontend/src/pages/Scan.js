import { SiNfc } from "react-icons/si";
import { Center, Heading,  Stack } from "@chakra-ui/react";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useState } from "react";

export const Scan = () => {
  const [connection, setConnection] = useState(null);

fetch("http://localhost:5001/tags")

  useEffect(() => {
    const _connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5001/tags/scan-hub')
      .configureLogging(LogLevel.Information)
      .build();

    async function start() {
      try {
        await _connection.start();
        console.log('SignalR Connected.');
      } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
      }
    }

    start();

    _connection.on('scanned', id => {
      console.log(id)
    });

    setConnection(_connection);
  }, []);

  return (
    <Center>
      <Stack>
        <SiNfc size="150px" onClick={(c) => console.log(c)} />
        <Heading textAlign="center">Scan Fabric</Heading>
      </Stack>
    </Center>
  );
};
