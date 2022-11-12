import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Table,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Wash from "../assets/Waschen_30.svg";
import Dry from "../assets/Trommeltrocknen_1.svg";
import Bleach from "../assets/Nicht_bleichen_v2.svg";
import Iron from "../assets/Nicht_bügeln.svg";
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

export const Details = () => {
  const navigate = useNavigate();
  const [window, setWindow] = useState();
  const [page2, setPage2] = useBoolean();

  const tag = {
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
  };

  return (
    <Box padding={3}>
      {!page2 && (
        <>
          <Heading>Textile Information</Heading>
          <TableContainer>
            <Table variant="striped" w="100%">
              <Tbody>
                <Tr>
                  <Td>Id:</Td>
                  <Td>{tag?.id}</Td>
                </Tr>
                <Tr>
                  <Td>Production Year:</Td>
                  <Td>{tag?.year}</Td>
                </Tr>
                <Tr>
                  <Td>Supplier:</Td>
                  <Td>{tag?.supplier}</Td>
                </Tr>
                <Tr>
                  <Td>Product Nr.:</Td>
                  <Td>{tag?.product_nr}</Td>
                </Tr>
                <Tr>
                  <Td>Material:</Td>
                  <Td>{tag?.material}</Td>
                </Tr>
                <Tr>
                  <Td>Customer:</Td>
                  <Td>{tag?.customer}</Td>
                </Tr>
                <Tr>
                  <Td>Article Nr.:</Td>
                  <Td>{tag?.article_nr}</Td>
                </Tr>
                <Tr>
                  <Td>Article Type.:</Td>
                  <Td>
                    <Select>
                      <option>Curtain</option>
                      <option>Pillow</option>
                      <option>Blanket</option>
                    </Select>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Stack>
            <Text>Cleaning details:</Text>
            <HStack bg="gray.200" padding={1} borderRadius={5}>
              <Image src={Wash} w="50px" />
              <Image src={Dry} w="50px" />
              <Image src={Bleach} w="50px" />
              <Image src={Iron} w="50px" />
            </HStack>
          </Stack>
        </>
      )}
      {page2 && (
        <Stack>
          <Heading>Textile Location</Heading>
          <HStack>
            <Text w="100%">Building:</Text>
            <Input placeholder="Building 14a" />
          </HStack>
          <HStack>
            <Text w="100%">Room Nr:</Text>
            <Input placeholder="42" />
          </HStack>
          <Stack>
            <Text>Position:</Text>
            <HStack h="150px">
              <Box
                h="100%"
                w="25%"
                bg={window === 0 ? "red.200" : "gray.200"}
                onClick={() => setWindow(0)}
              />
              <Box
                h="100%"
                w="50%"
                bg={window === 1 ? "red.200" : "gray.200"}
                onClick={() => setWindow(1)}
              />
              <Box
                h="100%"
                w="25%"
                bg={window === 2 ? "red.200" : "gray.200"}
                onClick={() => setWindow(2)}
              />
            </HStack>
          </Stack>
        </Stack>
      )}

      {!page2 && (
        <Button
          marginY={4}
          position={"absolute"}
          right={4}
          colorScheme="blue"
          onClick={() => setPage2.on()}
        >
          Next
        </Button>
      )}
      {page2 && (
        <>
          <Button
            marginY={4}
            position={"absolute"}
            left={4}
            colorScheme="blue"
            onClick={() => setPage2.off()}
          >
            Back
          </Button>
          <Button
            marginY={4}
            position={"absolute"}
            right={4}
            colorScheme="blue"
            onClick={() => navigate("/StartWashingMachine")}
          >
            Save
          </Button>
        </>
      )}
    </Box>
  );
};
