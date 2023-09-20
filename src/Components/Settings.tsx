import { useColorMode } from "@chakra-ui/color-mode";
import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Spacer,
  IconButton,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Container,
  Divider,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  useNumberInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Textarea,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { FaSun, FaMoon } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineCloud, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiLogOut } from "react-icons/fi";
import { axi } from "../Utils/api";
import { IOrder, ITable } from "../Interfaces";

function Settings() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [userName, setUserName] = useState<string>();

  const setLocalName = () => {
    if (!userName) return toast.error("이름을 입력해주세요.");
    localStorage.setItem("user", userName);
    toast.success("이름이 설정되었습니다.");
  };

  const clearSessionStorage = () => {
    sessionStorage.clear();
    toast.success("세션 스토리지가 초기화되었습니다.");
  };

  return (
    <Box padding="10px" margin="15px">
      <Container>
        <Button colorScheme="blue" w="100%" my="10px" onClick={() => navigate("/")}>
          메인으로
        </Button>
        <Button colorScheme="red" w="100%" mt="10px" mb="20px" onClick={() => navigate("/menu")}>
          메뉴 설정 페이지
        </Button>
        <Text fontSize="2xl" fontWeight="bold">
          이름 설정 {localStorage.getItem("user") ? `(${localStorage.getItem("user")})` : ""}
        </Text>
        <Divider mb="10px" />
        <Text fontSize="xl" my="5px" fontWeight="bold">
          이름
        </Text>
        <Input placeholder="이름" my="5px" onChange={(e) => setUserName(e.target.value)} />
        <Button colorScheme="blue" mb="20px" onClick={() => setLocalName()}>
          설정하기
        </Button>
        <Divider />
        <Text fontSize="2xl" mb="10px" fontWeight="bold">
          세션 스토리지 초기화
        </Text>
        <Button colorScheme="blue" mb="10px" onClick={() => clearSessionStorage()}>
          초기화
        </Button>
      </Container>
    </Box>
  );
}

export default Settings;
