import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ADMIN_ROUTES = ["/admin", "/list", "/add-product"];

const Layout = ({ children, darkMode, setDarkMode }) => {
  const { pathname } = useLocation();
  const isAdmin = ADMIN_ROUTES.some(r => pathname.startsWith(r));

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
    </>
  );
};

export default Layout;
