import { chakra } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "../Pages/index";
import MenuPage from "../Pages/menu";
import OrderPage from "../Pages/order";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/*" element={<span>404</span>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
