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
import Confirmation from "../components/Confirmation";

import { useEffect, useState } from "react";
import { firebase } from "../firebase-config";

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

const bookengs = [{ path: "confirmation/fHI07FTGEcsUQpKDGjrl" }];
const AppRouter = () => {
  const uid = firebase.auth().currentUser
    ? firebase.auth().currentUser.uid
    : null;
  const [isBusy, setBusy] = useState(true);
  const [bookings, setBookings] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  // useEffect(() => {
  //   async function fetchData() {
  //     const dummyBookings = [];
  //     const bookRef = firebase
  //       .firestore()
  //       .collection(`users/${uid}/bookings`)
  //       .orderBy("dateTime", "desc");
  //     const bookSnap = await bookRef.get();
  //     const IDKey = 0;
  //     bookSnap.forEach((doc) => {
  //       // console.log(doc.id, doc.data());
  //       // dummyBookings.push(doc.data());
  //       const bookid = doc.data().bookid;
  //       dummyBookings.push({
  //         path: "confirmation/" + bookid,
  //       });
  //     });
  //     setBookings(dummyBookings);
  //     console.log("bookings routes");
  //     console.log(bookings);
  //     console.log(bookengs);
  //     setBusy(false);
  //   }
  //   fetchData();
  // }, [refreshKey]);

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
            {bookengs.map((route) => (
              <Route {...route} element={<Confirmation />} />
            ))}
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default AppRouter;
