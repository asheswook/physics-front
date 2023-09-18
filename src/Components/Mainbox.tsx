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
import { OrderType, OrderTypeValues, orderStatusParser } from "../Utils/types";

function Mainbox() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tableModal = useDisclosure();
  const isDark = colorMode === "dark";
  const [tables, setTables] = useState<ITable[]>([]);
  const [tableNumber, setTableNumber] = useState<number>();
  const [orderBody, setOrderBody] = useState<any>({ quantity: 1 });

  const fetchTables = async (tableNumber: number | undefined) => {
    const toastId = toast.loading("조회 중...");
    const body: any = {};
    if (tableNumber) body.tableNumber = tableNumber;

    const res = await axi.post("/table/search", body);

    if (tableNumber) {
      if (res.data.code == 200) {
        setTables([res.data.table]);
        toast.success("테이블 조회에 성공했습니다.", { id: toastId });
      } else if (res.data.code == 400) toast.error("테이블이 존재하지 않습니다.", { id: toastId });
      else toast.error("테이블 조회에 실패했습니다.", { id: toastId });
    } else {
      if (res.data.code == 200) {
        setTables(res.data.tables);
        toast.success("테이블 조회에 성공했습니다.", { id: toastId });
      } else if (res.data.code == 400) toast.error("테이블이 존재하지 않습니다.", { id: toastId });
      else toast.error("테이블 조회에 실패했습니다.", { id: toastId });
    }
  };

  useEffect(() => {
    fetchTables(tableNumber);
  }, [tableNumber]);

  /* Input */
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 50,
    onChange: (value) => {
      setTableNumber(parseInt(value));
    },
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  /* Input */

  /* Input 주문시 */
  const a = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 50,
    onChange: (value) => {
      setOrderBody({ ...orderBody, tableNumber: parseInt(value) });
      console.log(orderBody);
    },
  });

  const inc2 = a.getIncrementButtonProps();
  const dec2 = a.getDecrementButtonProps();
  const input2 = a.getInputProps();
  /* Input 주문시 end */

  const [targetTableNumber, setTargetTableNumber] = useState<number | undefined>(undefined);
  const [targetTableOrders, setTargetTableOrders] = useState<IOrder[] | undefined>(undefined);
  const [targetTable, setTargetTable] = useState<ITable | undefined>(undefined);

  const handleMenuChoose = (value: string | string[]) => {
    setOrderBody({ ...orderBody, menu: value });
  };

  const handleQuantityChoose = (value: number) => {
    setOrderBody({ ...orderBody, quantity: value });
  };

  const handleMemoChoose = (memo: string) => {
    setOrderBody({ ...orderBody, memo: memo });
  };

  useEffect(() => {
    const fetchTargetTable = async () => {
      const res = await axi.post("/order/search", { tableNumber: targetTableNumber });
      if (res.data.code == 200) {
        setTargetTableOrders(res.data.curOrders);
      } else toast.error("오더 조회에 실패했습니다.");

      const res2 = await axi.post("/table/search", { tableNumber: targetTableNumber });
      if (res2.data.code == 200) {
        setTargetTable(res2.data.table);
      } else toast.error("테이블 조회에 실패했습니다.");
    };
    if (tableModal.isOpen) fetchTargetTable();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableModal.isOpen]);

  const order = async () => {
    if (!orderBody.tableNumber) orderBody.tableNumber = 1;
    const res = await axi.post("/order", { ...orderBody, orderedServer: "김재욱" });
    if (res.data.code == 200) {
      toast.success("주문에 성공했습니다.");
      fetchTables(undefined);
      onClose();
    } else toast.error("주문에 실패했습니다.");
  };

  return (
    <Box mb="30px">
      {/* 모달 시작 */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>주문하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack w="180px" mb="8px">
              <Button {...inc2}>+</Button>
              <Input {...input2} />
              <Button {...dec2}>-</Button>
              <Text fontSize="xl" fontWeight="bold">
                번
              </Text>
            </HStack>
            <Divider my="15px" />
            <Box display="flex" flexDirection="row" alignItems="center">
              <Menu closeOnSelect={false}>
                <MenuButton as={Button} colorScheme="blue">
                  메뉴 선택
                </MenuButton>
                <MenuList minWidth="240px">
                  <MenuOptionGroup defaultValue="jaewook" title="품목" type="radio" onChange={(value) => handleMenuChoose(value)}>
                    <MenuItemOption value="제육볶음">제육볶음</MenuItemOption>
                    <MenuItemOption value="사이다">사이다</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <Text ml="30px" fontSize="xl">
                {orderBody.menu}
              </Text>
              <NumberInput ml="8px" w="80px" defaultValue={orderBody.quantity} min={1} max={10} onChange={(value) => handleQuantityChoose(parseInt(value))}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text ml="10px" fontSize="xl" fontWeight="bold">
                개
              </Text>
            </Box>
            <Textarea mt="10px" placeholder="요청사항 (예시: 덜맵게)" onChange={(event) => handleMemoChoose(event.target.value)} resize="none" />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                order();
                onClose;
              }}
            >
              주문하기
            </Button>
            <Button onClick={onClose}>그만두기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 모달 끝, 테이블 모달 시작*/}
      <Modal isOpen={tableModal.isOpen} onClose={tableModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{targetTable ? targetTable.tableNumber + "번" : "로드 중..."}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <Text fontSize="lg" fontWeight="bold">
                테이블 번호: {targetTable ? targetTable.tableNumber + "번" : "로드 중..."}
              </Text>
              <Spacer />
              <Text fontSize="lg" fontWeight="bold">
                총 가격: {targetTable ? targetTable.amountDue + "원" : "로드 중..."}
              </Text>
            </HStack>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>주문번호</Th>
                    <Th>메뉴</Th>
                    <Th>개수</Th>
                    <Th>상태</Th>
                    <Th>주문한 서버</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {targetTableOrders &&
                    targetTableOrders.map((order, i) => (
                      <Tr>
                        <Td>{order.orderNumber + "번"}</Td>
                        <Td>{order.menu.name}</Td>
                        <Td>{order.quantity + "개"}</Td>
                        <Td>{orderStatusParser(order.status)}</Td>
                        <Td>{order.orderedServer}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={tableModal.onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 테이블 모달 끝 */}
      {/* 테이블 관리 시작 */}
      <Container>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Text fontSize="2xl" fontWeight="bold">
            테이블 관리
          </Text>
        </Box>
        <Divider my="7px" />
        <Button my="10px" mb="15px" w="100%" colorScheme="red" onClick={onOpen}>
          주문하기
        </Button>
        <Box display="flex" flexDirection="row" alignItems="center">
          <HStack w="150px">
            <Button {...inc}>+</Button>
            <Input {...input} />
            <Button {...dec}>-</Button>
          </HStack>
          <Text ml="5px" fontSize="xl" fontWeight="bold">
            번
          </Text>
          <Box display="flex" ml="auto" flexDirection="column">
            <Button mb="5px" colorScheme="blue" onClick={() => fetchTables(undefined)}>
              전체 조회
            </Button>
          </Box>
        </Box>

        <Box my="10px">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>테이블 번호</Th>
                  <Th isNumeric>주문 총계</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tables &&
                  tables.map((table) => (
                    <Tr
                      onClick={() => {
                        tableModal.onOpen();
                        setTargetTableNumber(table.tableNumber);
                      }}
                    >
                      <Td>{table.tableNumber + "번"}</Td>
                      <Td isNumeric>{table.amountDue + "원"}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default Mainbox;
