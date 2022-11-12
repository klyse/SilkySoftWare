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

export const WashingResult = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: "de060404",
      material: "100% cotton",
      supplier: "SÜDBUND eG.",
      charge: "22/10",
      article_nr: "10871",
      product_nr: "78912",
      customer: "Falkensteiner",
      room: "1 Left",
      dimensions: "200x190",
      type: "curtain",
      year: 2019,
    },
    {
      id: "66473eae",
      material: "100% silk",
      supplier: "SÜDBUND eG.",
      charge: "20/10",
      article_nr: "10871",
      product_nr: "41231",
      customer: "Falkensteiner",
      room: "1 Right",
      dimensions: "200x190",
      type: "pillow",
      year: 2022,
    },
    {
      id: "46fd8da1",
      material: "100% polyester",
      supplier: "SÜDBUND eG.",
      charge: "21/10",
      article_nr: "10871",
      product_nr: "98124",
      customer: "Falkensteiner",
      room: "2 Center",
      dimensions: "200x190",
      type: "blanket",
      year: 2011,
    },
  ];

  return (
    <Box padding={3}>
      <Heading>sens-o-wash information:</Heading>
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
      <Heading>Washed Items:</Heading>
      <List>
        <ListItem>
          {items.map((i, idx) => {
            let icon = BiBlanket;

            switch (i.type) {
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
                  <Text w="90px">{i.id}</Text>
                  <Text w="90px" fontWeight="bold">
                    {i.room}
                  </Text>
                  <Spacer />
                  <Text>
                    year: <b>{i.year}</b>
                  </Text>
                </Flex>
              </Box>
            );
          })}
        </ListItem>
      </List>
      <Center
        position="absolute"
        bottom="-70px"
        marginLeft="50%"
        transform="translate(-50%)"
      >
        <Button onClick={() => navigate("/Scan")} size="lg">
          Scan Tag
        </Button>
      </Center>
    </Box>
  );
};
