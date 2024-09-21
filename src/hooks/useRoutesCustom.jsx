import React, { Suspense, useState } from "react";
import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import FormSignIn from "../components/Form/FormSignIn";
import FormSignUp from "../components/Form/FormSignUp";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
// import ManagerUser from "../pages/ManagerUser/ManagerUser";
const ManagerUser = React.lazy(() => import('./../pages/ManagerUser/ManagerUser'))
import CreateUser from "../pages/CreateUser/CreateUser";
const AdminLogin = React.lazy(() => import("../pages/AdminLogin/AdminLogin"))
import { Skeleton } from "antd";
const FormInputSignIn = React.lazy(() => import("../components/Form/FormInputSignIn"))
// import FormInputSignIn from "../components/Form/FormInputSignIn";
import FormInputSignUp from "../components/Form/FormInputSignUp";
import animationLoading from "./../assets/animation/LoadingAnimation.json"
import Lottie, { useLottie } from "lottie-react";
import FormEditUser from "../components/Form/FormEditUser";

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
    {
      path: path.signIn,
      element: <Suspense fallback={<Lottie animationData={animationLoading} loop={true} style={{ width: "50%", margin: "auto" }} />}><FormInputSignIn /></Suspense>
    },
    ,
    {
      path: path.signUp,
      element: <FormInputSignUp />
    },
    {
      path: path.adminPage,
      element: <AdminTemplate />,
      children: [
        {
          // index: true,
          path: "manager-user",
          element: <Suspense fallback={<Skeleton />}><ManagerUser /></Suspense>,
          children: [
            {
              index: true,
              element: <FormEditUser />
            }
          ]
        },
        {
          path: path.createUser,
          element: <Suspense fallback={<Skeleton />}><CreateUser /></Suspense>
        }
      ]
    },
    {
      path: path.adminLoginPage,
      element: <Suspense fallback={<Skeleton />}><AdminLogin /></Suspense>
    }
  ]);
  return routes;
};

export default useRoutesCustom;
