import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import FormSignIn from "../components/Form/FormSignIn";
import FormSignUp from "../components/Form/FormSignUp";

const useRoutesCustom = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  function checkForm(isSignIn) {
    setIsSignIn(isSignIn);
  }
  const routes = useRoutes([
    {
      path: path.homePage,
      element: <HomeTemplate checkForm={checkForm} />,

      children: [
        {
          index: true,
          element: isSignIn ? <FormSignIn checkForm={checkForm} /> : <FormSignUp checkForm={checkForm} />
        }
      ]
    },
  ]);
  return routes;
};

export default useRoutesCustom;
