import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Logo from "../images/logo192.png";
import { firebase } from "../firebase-config";
import { Text } from "@chakra-ui/react";
import { useState } from "react";

const { Header } = Layout;
const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed Out");
    })
    .catch((e) => {
      console.error("Sign Out Error", e);
    });
};

const navOptions = [
  { key: 0, label: <Link to="/">Dashboard</Link> },
  { key: 1, label: <Link to="/login">Login</Link> },
  { key: 2, label: <Link to="/newbooking">New Booking</Link> },
  { key: 3, label: <Link to="/mybooking">My Booking</Link> },
  // { key: 4, label: <Link to="/about">About</Link> },
];

const navOptionsLoggedIn = [
  { key: 0, label: <Link to="/">Dashboard</Link> },
  { key: 4, label: <div onClick={signOut()}>Logout</div> },
  { key: 2, label: <Link to="/newbooking">New Booking</Link> },
  { key: 3, label: <Link to="/mybooking">My Booking</Link> },
];

const navOpt = () => {
  const user = firebase.auth().currentUser;
  console.log(`navOpt = ${user}`);
  if (user) return navOptionsLoggedIn;
  return navOptions;
};

const AppHeader = () => {
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);
  return (
    <>
      <Header>
        <div className="logo">
          <img width="50px" src={Logo} alt="logo" />
        </div>
        <Text color={"white"}>{`Logged in = ${currentUser}`}</Text>
        <div className="nav-bar">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            items={navOpt()}
          />
        </div>
      </Header>
    </>
  );
};

export default AppHeader;
