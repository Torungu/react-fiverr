import React from "react";
import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: path.homePage,
      element: <HomeTemplate />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
