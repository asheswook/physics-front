import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Badge,
  Image,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorModeValue,
  FormLabel,
  Checkbox,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Footer from "../Components/Footer";
import MenuBox from "../Components/Menu";
import { axi } from "../Utils/api";
import { isIE } from "react-device-detect";
import Navigation from "../Components/Navigation";

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <MenuBox />
      <Footer />
    </>
  );
};

export default MenuPage;
