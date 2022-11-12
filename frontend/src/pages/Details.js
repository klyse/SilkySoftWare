import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Wash from "../assets/Waschen_30.svg";
import Dry from "../assets/Trommeltrocknen_1.svg";
import Bleach from "../assets/Nicht_bleichen_v2.svg";
import Iron from "../assets/Nicht_bügeln.svg";

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
        <Stack>
          <HStack>
            <Text width="100%">Id:</Text>
            <Text>{tag?.id}</Text>
          </HStack>
          <HStack>
            <Text width="100%">Production Year:</Text>
            <Text>{tag?.year}</Text>
          </HStack>
          <HStack>
            <Text>Supplier:</Text>
            <Text width="100%" textAlign="right">
              {tag?.supplier}
            </Text>
          </HStack>
          <HStack>
            <Text>Product Nr.:</Text>
            <Text width="100%" textAlign="right">
              {tag?.product_nr}
            </Text>
          </HStack>
          <Stack>
            <Text>Cleaning details:</Text>
            <HStack bg="gray.200" padding={1} borderRadius={5}>
              <Image src={Wash} w="50px" />
              <Image src={Dry} w="50px" />
              <Image src={Bleach} w="50px" />
              <Image src={Iron} w="50px" />
            </HStack>
          </Stack>
          <HStack>
            <Text>Material:</Text>
            <Text w="100%" textAlign="right">
              {tag?.material}
            </Text>
          </HStack>
          <HStack>
            <Text w="100%">Customer:</Text>
            <Input placeholder={tag?.customer} />
          </HStack>
          <HStack>
            <Text w="100%">Article Nr:</Text>
            <Input placeholder={tag?.article_nr} />
          </HStack>
          <HStack>
            <Text w="100%">Article Type:</Text>
            <Select>
              <option>Curtain</option>
              <option>Pillow</option>
              <option>Blanket</option>
            </Select>
          </HStack>
        </Stack>
      )}
      {page2 && (
        <Stack>
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
        <Button
          marginY={4}
          position={"absolute"}
          right={4}
          colorScheme="blue"
          onClick={() => navigate("/StartWashingMachine")}
        >
          Save
        </Button>
      )}
    </Box>
  );
};
