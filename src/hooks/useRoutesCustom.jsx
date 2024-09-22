import React from "react";
import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomePage from "../pages/HomePage/HomePage";
import ListJobPage from "../pages/ListJobPage/ListJobPage";
import TypeJobPage from "../pages/TypeJobPage/TypeJobPage";
import DetailJobPage from "../pages/DetailJobPage/DetailJobPage";

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: path.homePage,
      element: <HomePage />,
      index: true,
    },
    {
      path: path.listJob,
      element: <ListJobPage />,
    },
    {
      path: path.typeJob,
      element: <TypeJobPage />,
    },
    {
      path: path.detailJob,
      element: <DetailJobPage />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
