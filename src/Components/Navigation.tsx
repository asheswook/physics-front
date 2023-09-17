import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Box, Spacer, IconButton, Divider } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { FaSun, FaMoon } from "react-icons/fa";
import { PiSneakerMoveFill } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navigation({ linkto }: any) {
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <>
      <Flex w="100%" p="10px" alignItems="center">
        <Box ml="4" fontWeight="semibold" fontSize="2xl">
          물리학과
        </Box>
        <Spacer></Spacer>
        <IconButton
          aria-label=""
          ml={2}
          icon={<PiSneakerMoveFill />}
          onClick={() => {
            navigate(linkto);
          }}
        ></IconButton>
        <IconButton aria-label="" ml={2} icon={isDark ? <FaSun /> : <FaMoon />} onClick={toggleColorMode}></IconButton>
      </Flex>
      <Divider mb="10px" />
    </>
  );
}

export default Navigation;
