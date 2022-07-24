import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Logo from "../images/logo192.png";
import { firebase } from "../firebase-config";
import { useState } from "react";

const { Header } = Layout;

const AppHeader = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

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
    // { key: 0, label: <Link to="/">Home</Link> },
    {
      key: 1,
      label: (
        <Link to="/" onClick={signOut}>
          Logout
        </Link>
      ),
    },
    { key: 2, label: <Link to="/newbooking">New Booking</Link> },
    { key: 3, label: <Link to="/mybooking">My Booking</Link> },
  ];

  return (
    <>
      <Header >
        <div className="logo">
          <Link to="/"><img width="60px" src={Logo} alt="logo" /></Link>
        </div>
        <div className="nav-bar">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            style={{ lineHeight: '64px' }}
            items={loggedIn ? navOptionsLoggedIn : navOptions}
          />
        </div>
      </Header>
    </>
  );
};

export default AppHeader;
