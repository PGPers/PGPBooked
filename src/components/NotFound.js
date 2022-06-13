import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h2>404 Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </>
  );
};

export default NotFound;
