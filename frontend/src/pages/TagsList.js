import { AddIcon } from "@chakra-ui/icons";
import { BiBlanket } from "react-icons/bi";
import { GiTheaterCurtains, GiPillow } from "react-icons/gi";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Spacer,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Wash from "../assets/Waschen_30.svg";
import Dry from "../assets/Trommeltrocknen_1.svg";
import Bleach from "../assets/Nicht_bleichen_v2.svg";
import Iron from "../assets/Nicht_bügeln.svg";

export const TagsList = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tag, setTag] = useState(null);
  const [window, setWindow] = useState();
  const [page2, setPage2] = useBoolean();

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
    <>
      <List padding={3}>
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
              <Box
                key={idx}
                onClick={() => {
                  console.log("hi");
                  onOpen();
                  setTag(i);
                }}
              >
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editing Textile Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                <Box h="100%" w="25%" bg={window === 0 ? "red.200": "gray.200"} onClick={() => setWindow(0)} />
                <Box h="100%" w="50%" bg={window === 1 ? "red.200": "gray.200"} onClick={() => setWindow(1)} />
                <Box h="100%" w="25%" bg={window === 2 ? "red.200": "gray.200"} onClick={() => setWindow(2)} />
              </HStack>
              </Stack>
              </Stack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            {page2 && (
              <Button colorScheme="blue" onClick={onClose}>
                Save
              </Button>
            )}
            {!page2 && (
              <Button colorScheme="blue" onClick={() => setPage2.on()}>
                Next
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
