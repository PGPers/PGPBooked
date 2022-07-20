import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import App from "../App";
import AppHeader from "../components/AppHeader";
import { firebase } from "../firebase-config";

import "./layout.css";
const { Header, Content, Footer } = Layout;



const AppLayout = ({children}) => {

  const [loggedIn, setLoggedIn] = useState(false);
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  function Header(){
    if(loggedIn)
    {
      return (<AppHeader></AppHeader>);
    }
  }
  return (
    <>
      <div className="bg">
       <Layout className="layout" style={{ height: "auto" }}>
        {Header()}
        <Content className="content"
        >
          <div className="site-layout-content">{children}</div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          PGPers ©2022 Created by Steven and Nixon
        </Footer> */}
      </Layout>
      </div>
    </>
  );
};


export default AppLayout;
