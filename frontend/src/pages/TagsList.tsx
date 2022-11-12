import { AddIcon } from "@chakra-ui/icons";
import { BiBlanket } from "react-icons/bi";
import { GiTheaterCurtains, GiPillow } from "react-icons/gi";
import {
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
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

export const TagsList = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const items = [
    {
      id: 12,
      type: "curtain",
      fabric: "cotton",
      year: 2019,
      wash_symbols: ["iron", "wash"],
    },
    {
      id: 13,
      type: "pillow",
      fabric: "silk",
      year: 2022,
      wash_symbols: ["iron", "wash"],
    },
    {
      id: 15,
      type: "blanket",
      fabric: "polyester",
      year: 2011,
      wash_symbols: ["iron", "wash"],
    },
  ];

  return (
    <>
      <List>
        <ListItem onClick={onOpen}>
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
            }

            return (
              <Flex
                direction="row"
                key={idx}
                bg="blue.100"
                padding={5}
                marginY={1}
                borderRadius={8}
              >
                <ListIcon alignSelf="center" as={icon} />
                <Text>{i.id}</Text>
                <Spacer />
                <Text>{i.fabric}</Text>
                <Spacer />
                <Text>Prod year: {i.year}</Text>
              </Flex>
            );
          })}
        </ListItem>
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>asdfklöasjdflasdf</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => navigate("/Scan")}>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
