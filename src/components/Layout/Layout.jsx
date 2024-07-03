import Navbar from "../Navbar/Navbar";
import React from "react";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
