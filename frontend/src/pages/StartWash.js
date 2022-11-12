import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const StartWash = () => {
  const navigate = useNavigate();

  return (
    <Box w="100vw" h="100vh" onClick={() => navigate("/Waiting")}>
      <Heading paddingTop={50} textAlign="center">
        Demo Time
      </Heading>
    </Box>
  );
};
