import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

export const MainLayout = () => {
  return (
    <Flex minHeight="100vh" direction="column">
      <Box as="header">
        <Navbar />
      </Box>
      <Box height="100%" position="relative">
        <Outlet />
      </Box>
      <Box as="footer" marginTop="auto">
        <Footer />
      </Box>
    </Flex>
  );
};
