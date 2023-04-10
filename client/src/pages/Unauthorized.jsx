import React from "react";
import { NavLink } from "react-router-dom";

const Unauthorized = () => {
  return (
    <>
      <div>Unauthorized</div>
      <NavLink to="/home">Back to Home Page</NavLink>
    </>
  );
};

export default Unauthorized;
