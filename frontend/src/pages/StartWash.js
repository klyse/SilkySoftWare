import { Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const StartWash = () => {
  const navigate = useNavigate();

  return (
    <Center paddingTop="100px">
      <Button onClick={() => navigate("/Waiting")}>
        Start Washing
      </Button>
    </Center>
  );
};
