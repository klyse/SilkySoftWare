import { AddIcon } from "@chakra-ui/icons";
import { BiBlanket } from "react-icons/bi";
import { GiTheaterCurtains, GiPillow } from "react-icons/gi";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Spacer,
  Stack,
  Text,
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

export const TagsList = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tag, setTag] = useState(null);

  const items = [
    {
      id: "de060404",
      material: "cotton",
      supplier: "SÜDBUND eG.",
      charge: "22/10",
      article_nr: "10871",
      customer: "Falkensteiner",
      room: "1 Left",
      dimensions: "200x190",
      type: "curtain",
      year: 2019,
    },
    {
      id: "66473eae",
      material: "silk",
      supplier: "SÜDBUND eG.",
      charge: "20/10",
      article_nr: "10871",
      customer: "Falkensteiner",
      room: "1 Right",
      dimensions: "200x190",
      type: "pillow",
      year: 2022,
    },
    {
      id: "46fd8da1",
      material: "polyester",
      supplier: "SÜDBUND eG.",
      charge: "21/10",
      article_nr: "10871",
      customer: "Falkensteiner",
      room: "2 Center",
      dimensions: "200x190",
      type: "blanket",
      year: 2011,
    },
  ];

  return (
    <>
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
                  bg="blue.100"
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
        å
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
          <ModalHeader>
            Editing Material <i>{tag?.id}</i>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
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
                <Text w="100%">Material:</Text>
                <Text>{tag?.material}</Text>
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
                <Text w="100%">Room:</Text>
                <Input placeholder={tag?.room} />
              </HStack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
