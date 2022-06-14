import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import App from "../App";
import AppHeader from "../components/AppHeader";

import "./layout.css";
const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => (
  <Layout className="layout" style={{ height: "100vh" }}>
    <AppHeader></AppHeader>
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <div className="site-layout-content">{children}</div>
    </Content>
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      PGPers ©2022 Created by Steven and Nixon
    </Footer>
  </Layout>
);

export default AppLayout;