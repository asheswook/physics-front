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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Stack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { axi } from "../Utils/api";
import { IOrder, ITable } from "../Interfaces";
import { orderStatusParser } from "../Utils/types";
import { SearchIcon } from "@chakra-ui/icons";
import { MdPendingActions } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import { BiDish } from "react-icons/bi";
import { RiTakeawayFill } from "react-icons/ri";

function OrderBox() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [endOrders, setEndOrders] = useState<IOrder[]>([]);
  const [targetOrderNumber, setTargetOrderNumber] = useState<number>();
  const [targetOrder, setTargetOrder] = useState<IOrder>();
  const [targetSearchBody, setTargetSearchBody] = useState<any>({});
  const [cookedOrders, setCookedOrders] = useState<IOrder[]>([]);

  const fetchOrders = async (orderNumber: number | undefined) => {
    const toastid = toast.loading("오더를 불러오는 중입니다...");
    const orderBody: any = {};
    if (orderNumber) {
      orderBody.orderNumber = orderNumber;
      orderBody.noCur = true;
    }

    const res = await axi.post("/order/search", orderBody);
    if (orderNumber) {
      setTargetOrder(res.data.orders[0]);
      return toast.success("오더를 성공적으로 불러왔습니다..", { id: toastid });
    }

    if (res.data.code === 200) {
      setOrders(res.data.curOrders);
      setCookedOrders(res.data.cookedOrders);
      setEndOrders(res.data.endOrders);
      return toast.success("오더를 성공적으로 불러왔습니다..", { id: toastid });
    } else toast.error("오더를 불러오는데 실패했습니다.", { id: toastid });
  };

  const searchOrder = async (searchBody: any) => {
    if (Object.keys(searchBody).length === 0) return toast.error("검색어를 입력해주세요.");

    const toastid = toast.loading("오더를 불러오는 중입니다...");
    const res = await axi.post("/order/search", searchBody);
    if (res.data.code === 200) {
      setOrders(res.data.curOrders);
      setCookedOrders(res.data.cookedOrders);
      setEndOrders(res.data.endOrders);
      return toast.success("오더를 성공적으로 불러왔습니다..", { id: toastid });
    } else toast.error("오더를 불러오는데 실패했습니다.", { id: toastid });
  };

  const changeOrderStatus = async (orderNumber: number, status: string) => {
    const toastid = toast.loading("오더 상태를 변경하는 중입니다...");
    const res = await axi.post("/order/modify", { orderNumber: orderNumber, status: status });
    if (res.data.code === 200) {
      toast.success("오더 상태를 성공적으로 변경했습니다.", { id: toastid });
      fetchOrders(targetOrderNumber);
    } else toast.error("오더 상태를 변경하는데 실패했습니다.", { id: toastid });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchOrders(targetOrderNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetOrderNumber]);

  useEffect(() => {
    if (!isOpen) {
      setTargetOrder(undefined);
      setTargetOrderNumber(undefined);
    }
  }, [isOpen]);

  const steps = [
    { title: "First", description: "주문 접수" },
    { title: "Second", description: "조리 중" },
    { title: "Third", description: "조리 완료" },
    { title: "Fourth", description: "서빙 완료" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  useEffect(() => {
    if (targetOrder) {
      switch (targetOrder.status) {
        case "ORDERED":
          setActiveStep(1);
          break;
        case "COOKING":
          setActiveStep(2);
          break;
        case "COOKED":
          setActiveStep(3);
          break;
        case "SERVED":
          setActiveStep(4);
          break;
        default:
          setActiveStep(1);
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetOrder]);

  const activeStepText = steps[activeStep - 1].description;

  return (
    <Box mb="30px">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{targetOrderNumber + "번 주문"}</ModalHeader>
          <ModalBody>
            <Stack>
              <Stepper size="sm" index={activeStep} gap="0">
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus complete={<StepIcon />} />
                    </StepIndicator>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              <Text mb="10px">
                현재 상태: <b>{activeStepText}</b>
              </Text>
              <HStack mb="10px" alignItems="center" justifyContent="center">
                <IconButton
                  onClick={() => {
                    if (!targetOrderNumber) return;
                    changeOrderStatus(targetOrderNumber, "ORDERED");
                  }}
                  size="lg"
                  colorScheme="pink"
                  aria-label="접수됨"
                  icon={<MdPendingActions />}
                />
                <Spacer />
                <IconButton
                  onClick={() => {
                    if (!targetOrderNumber) return;
                    changeOrderStatus(targetOrderNumber, "COOKING");
                  }}
                  size="lg"
                  colorScheme="yellow"
                  aria-label="조리중"
                  icon={<PiCookingPotBold />}
                />
                <Spacer />
                <IconButton
                  onClick={() => {
                    if (!targetOrderNumber) return;
                    changeOrderStatus(targetOrderNumber, "COOKED");
                  }}
                  size="lg"
                  colorScheme="blue"
                  aria-label="조리완료"
                  icon={<BiDish />}
                />
                <Spacer />
                <IconButton
                  onClick={() => {
                    if (!targetOrderNumber) return;
                    changeOrderStatus(targetOrderNumber, "SERVED");
                  }}
                  size="lg"
                  colorScheme="whatsapp"
                  aria-label="전달완료"
                  icon={<RiTakeawayFill />}
                />
              </HStack>
            </Stack>
            <Divider mb={"10px"} />
            <Text fontSize="xl" fontWeight="semibold">
              주문번호: {targetOrder ? targetOrder.orderNumber + "번" : "로드 중..."}
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              테이블: {targetOrder ? "Table " + targetOrder.tableNumber : "로드 중..."}
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              메뉴: {targetOrder ? targetOrder.menu.name : "로드 중..."}
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              수량: {targetOrder ? targetOrder.quantity + "개" : "로드 중..."}
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              요청사항: {targetOrder ? (targetOrder.memo ? targetOrder.memo : "X") : "로드 중..."}
            </Text>
            <Divider my="8px" />
            <Text fontSize="xl" fontWeight="semibold">
              상태: {targetOrder ? orderStatusParser(targetOrder.status) : "로드 중..."}
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              주문시간: {targetOrder ? targetOrder.createdAt.split("T")[1].split(".")[0] : "로드 중..."}
            </Text>

            <Text fontSize="xl" fontWeight="semibold">
              주문 받은 서버: {targetOrder ? targetOrder.orderedServer : "로드 중..."}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                onClose();
              }}
            >
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 모달 끝 */}
      <Container>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Text fontSize="2xl" fontWeight="bold">
            주문 관리
          </Text>
        </Box>
        <Divider my="7px" mb="10px" />
        {/* 검색 기능 */}
        <HStack mx="15px" mb="10px" alignItems="center" justifyContent="center">
          <Text fontSize="xl" fontWeight="bold">
            주문 번호
          </Text>
          <Spacer />
          <Text fontSize="xl" fontWeight="bold">
            테이블 번호
          </Text>
        </HStack>
        <HStack mb="10px" alignItems="center" justifyContent="center">
          <NumberInput w="110px" min={1} max={50}>
            <NumberInputField placeholder="주문번호" onChange={(e) => setTargetSearchBody({ orderNumber: parseInt(e.target.value) })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Spacer />
          <IconButton
            onClick={() => {
              searchOrder(targetSearchBody);
            }}
            size="lg"
            colorScheme="whatsapp"
            aria-label="검색"
            icon={<SearchIcon />}
          />
          <Spacer />
          <NumberInput w="110px" min={1} max={50}>
            <NumberInputField placeholder="테이블" onChange={(e) => setTargetSearchBody({ tableNumber: parseInt(e.target.value) })} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <Button my="10px" mb="15px" w="100%" colorScheme="blue" onClick={() => fetchOrders(undefined)}>
          새로 고침
        </Button>
        <Accordion defaultIndex={0}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  진행 중인 주문
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>주문번호</Th>
                      <Th>테이블</Th>
                      <Th>메뉴</Th>
                      <Th>수량</Th>
                      <Th>상태</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders &&
                      orders.map((order) => (
                        <Tr
                          style={order.memo ? { backgroundColor: "rebeccapurple" } : {}}
                          onClick={() => {
                            onOpen();
                            setTargetOrderNumber(order.orderNumber);
                          }}
                        >
                          <Td>{order.orderNumber + "번"}</Td>
                          <Td>{"Table " + order.tableNumber}</Td>
                          <Td>{order.menu.name}</Td>
                          <Td>{order.quantity + "개"}</Td>
                          <Td>{orderStatusParser(order.status)}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  서빙을 기다리는 주문
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>주문번호</Th>
                      <Th>테이블</Th>
                      <Th>메뉴</Th>
                      <Th>수량</Th>
                      <Th>상태</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cookedOrders &&
                      cookedOrders.map((order) => (
                        <Tr
                          onClick={() => {
                            onOpen();
                            setTargetOrderNumber(order.orderNumber);
                          }}
                        >
                          <Td>{order.orderNumber + "번"}</Td>
                          <Td>{"Table " + order.tableNumber}</Td>
                          <Td>{order.menu.name}</Td>
                          <Td>{order.quantity + "개"}</Td>
                          <Td>{orderStatusParser(order.status)}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  완료된 주문
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>주문번호</Th>
                      <Th>테이블</Th>
                      <Th>메뉴</Th>
                      <Th>수량</Th>
                      <Th>상태</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {endOrders &&
                      endOrders.map((order) => (
                        <Tr
                          onClick={() => {
                            onOpen();
                            setTargetOrderNumber(order.orderNumber);
                          }}
                        >
                          <Td>{order.orderNumber + "번"}</Td>
                          <Td>{"Table " + order.tableNumber}</Td>
                          <Td>{order.menu.name}</Td>
                          <Td>{order.quantity + "개"}</Td>
                          <Td>{orderStatusParser(order.status)}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Box>
  );
}

export default OrderBox;
