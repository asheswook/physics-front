import React from "react";
import Router from "../src/routes";
import { Toaster } from "react-hot-toast";
import { ChakraProvider, createLocalStorageManager } from "@chakra-ui/react";
import theme from "./chakraCfg";

const manager = createLocalStorageManager("physics-bar");

export function App() {
  return (
    <>
      <Toaster
        position="top-left"
        reverseOrder={false}
        toastOptions={{
          duration: 1600,
        }}
      />
      <ChakraProvider theme={theme} colorModeManager={manager}>
        <Router />
      </ChakraProvider>
    </>
  );
}
