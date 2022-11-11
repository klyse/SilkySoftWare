import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

export const MainLayout = () => {
  return (
    <Flex minHeight="100vh" direction="column">
      <Box as="header">
        <Navbar />
      </Box>
      <Box padding={{ base: 5 }} height="100%" position="relative">
        <Outlet />
      </Box>
      <Box as="footer" marginTop="auto">
        <Footer />
      </Box>
    </Flex>
  );
};
