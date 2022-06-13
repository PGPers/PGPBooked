import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <Link to="/about">Go to About component</Link>
    </>
  );
};

export default Dashboard;
