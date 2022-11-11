import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex flexDirection="column" alignItems="center" margin={2}>
      <Text>
        Made with ❤️ by{" "}
        <Link isExternal href="https://klyse.eu">
          Klyse
        </Link>
      </Text>
    </Flex>
  );
}
