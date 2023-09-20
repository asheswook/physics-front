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

function MenuBox() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [menuAddBody, setMenuAddBody] = useState<any>({});

  const addMenu = async () => {
    const res = await axi.post("/menu/add", menuAddBody);
    if (res.data.code === 200) {
      toast.success("메뉴가 추가되었습니다.");
      setMenuAddBody({});
    } else {
      toast.error("메뉴 추가에 실패했습니다.");
    }
  };

  const [menuList, setMenuList] = useState<any>([]);
  const getMenuList = async () => {
    const res = await axi.get("/menu/search");
    if (res.data.code === 200) {
      setMenuList(res.data.data);
    } else {
      toast.error("메뉴 리스트를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <Box borderWidth="1px" padding="10px" margin="15px" borderRadius="15px" boxShadow="0 10px 20px 0 rgba(0,0,0, 0.3)">
      <Container>
        <Text fontSize="2xl" fontWeight="bold">
          메뉴 추가하기
        </Text>
        <Divider />
        <Text fontSize="xl" my="5px" fontWeight="bold">
          이름
        </Text>
        <Input placeholder="이름" my="5px" onChange={(e) => setMenuAddBody({ ...menuAddBody, name: e.target.value })} />
        <Text fontSize="xl" fontWeight="bold">
          가격
        </Text>
        <Input placeholder="가격" my="5px" onChange={(e) => setMenuAddBody({ ...menuAddBody, price: e.target.value })} />
        <Button colorScheme="blue" mb="10px" onClick={addMenu}>
          추가
        </Button>
        <Divider />
        {/* 메뉴 리스트 */}
        <Text fontSize="2xl" fontWeight="bold" mb="10px">
          메뉴 리스트
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            {menuList.map((menu: any) => (
              <Tr>
                <Td>{menu.name}</Td>
                <Td>{menu.price}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </Box>
  );
}

export default MenuBox;
