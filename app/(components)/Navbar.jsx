"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

const Navbar = ({ children }) => {
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
