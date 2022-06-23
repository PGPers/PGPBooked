import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import About from "../components/About";
import NewBooking from "../components/NewBooking";
import MyBooking from "../components/MyBooking";
import AppLayout from "../layout";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";
import ProtectedRoutes from "./ProtectedRoutes";

const appRoutes = [
  { key: 1, path: "/", element: <Dashboard /> },
  { key: 2, path: "/about", element: <About /> },
  { key: 5, path: "*", element: <NotFound /> },
  { key: 6, path: "/login", element: <Login /> },
  { key: 7, path: "/signup", element: <Signup /> },
  { key: 8, path: "/forgotpassword", element: <ForgotPassword /> },
];

const protectedRoutes = [
  { key: 3, path: "/newbooking", element: <NewBooking /> },
  { key: 4, path: "/mybooking", element: <MyBooking /> },
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
            {protectedRoutes.map((route) => (
              <Route element={<ProtectedRoutes />}>
                <Route {...route} />
              </Route>
            ))}
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
