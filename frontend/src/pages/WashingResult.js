import { BiBlanket } from "react-icons/bi";
import { GiTheaterCurtains, GiPillow } from "react-icons/gi";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import {
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const WashingResult = () => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    fetch(`http://172.20.10.2:5001/tags`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((t) => {
      t.json().then((b) => {
        setTags(b.data);
        console.log(b.data);
      });
    });
  }, []);

  return (
    <Box padding={3}>
      <Heading size="lg">sens-o-wash information:</Heading>
      <TableContainer>
        <Table variant="simple" w="100%">
          <Tbody>
            <Tr>
              <Td>Temperature:</Td>
              <Td isNumeric>40°C</Td>
            </Tr>
            <Tr>
              <Td>Speed:</Td>
              <Td isNumeric>1200 RPM</Td>
            </Tr>
            <Tr>
              <Td>pH Level:</Td>
              <Td isNumeric>11</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Heading size="lg">Washed Items:</Heading>
      <List>
        <ListItem>
          {tags?.map((i, idx) => {
            let icon = BiBlanket;

            switch (i.values.type) {
              case "blanket":
                icon = BiBlanket;
                break;
              case "curtain":
                icon = GiTheaterCurtains;
                break;
              case "pillow":
                icon = GiPillow;
                break;
              default:
                break;
            }

            return (
              <Box key={idx}>
                <Flex
                  direction="row"
                  bg="gray.100"
                  padding={5}
                  marginY={1}
                  borderRadius={8}
                >
                  <ListIcon alignSelf="center" as={icon} />
                  <Text w="56px">{i.values.type}</Text>
                  <Text w="95px" fontWeight="bold">
                    #{i.tagId}
                  </Text>
                  <Spacer />
                  <Text>
                    Wash cycles: <b>{i.values.cycles} ✅</b>
                  </Text>
                </Flex>
              </Box>
            );
          })}
          <ListItem>
            <Box>
              <Stack bg="gray.100" padding={5} marginY={1} borderRadius={8}>
                <Flex direction="row">
                  <ListIcon alignSelf="center" as={GiTheaterCurtains} />
                  <Text w="56px">curtain</Text>
                  <Text w="95px" fontWeight="bold">
                    #319d12
                  </Text>
                  <Spacer />
                  <Text>
                    Wash cycles: <b>6 ❌</b>
                  </Text>
                </Flex>
                <Text>* Item was washed to hot</Text>
              </Stack>
            </Box>
          </ListItem>
        </ListItem>
      </List>
    </Box>
  );
};
