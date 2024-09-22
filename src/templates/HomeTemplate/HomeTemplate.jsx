import React from "react";
import HomeHeader from "../../components/Headers/HomeHeader";
import HomeFooter from "../../components/Footers/HomeFooter";
import { Outlet } from "react-router-dom";

const HomeTemplate = ({ checkForm }) => {
  return (
    <>
      <HomeHeader checkForm={checkForm} />
      <Outlet />
      <HomeFooter />
    </>
  );
};

export default HomeTemplate;
