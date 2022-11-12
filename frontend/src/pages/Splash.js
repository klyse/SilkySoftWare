import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Img from "../assets/Splash.jpeg";

export const Splash = () => {
    const navigate = useNavigate();
  return <Image src={Img} onClick={() => navigate("/TagsList") } />;
};
