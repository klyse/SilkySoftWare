import { HamburgerIcon } from "@chakra-ui/icons";
import {GiWashingMachine} from "react-icons/gi"
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as LogoComponent } from "../../assets/logo.svg";
import { ReactComponent as AvatarSvg } from "../../assets/avatar.svg";
import { MenuRoutes } from "../../routes";

const Logo = chakra(LogoComponent);

export default function Navbar() {

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={ <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Link as={RouterLink} to="/">
            <Icon as={GiWashingMachine} fill={useColorModeValue("black", "white")} />
          </Link>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {MenuRoutes.map((route) => (
              <Link key={route.Path} as={RouterLink} to={route.Path}>
                <Text>{route.Name}</Text>
              </Link>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <HStack spacing={3}>
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} icon={<AvatarSvg />}  />
                </MenuButton>
              </Menu>
            </Box>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
