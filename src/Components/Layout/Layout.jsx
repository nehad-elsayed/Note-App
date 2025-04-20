import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavbarComp from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <NavbarComp />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
