import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import About from "../components/About";
import Product from "../components/Product";
import Report from "../components/Reports";
import AppLayout from "../layout";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import { ChakraProvider } from "@chakra-ui/react";

const appRoutes = [
  { key: 1, path: "/", element: <Dashboard /> },
  { key: 2, path: "/about", element: <About /> },
  { key: 3, path: "/product", element: <Product /> },
  { key: 4, path: "/report", element: <Report /> },
  { key: 5, path: "*", element: <NotFound /> },
  { key: 6, path: "/login", element: <Login /> },
];

const AppRouter = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {appRoutes.map((route) => (
              <Route {...route} />
            ))}
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
