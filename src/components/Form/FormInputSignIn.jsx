import React, { useContext } from "react";
import InputCustom from "../Input/InputCustom";
import { useFormik } from "formik";
import { authService } from "../../service/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { getInfoUser } from "../../redux/authSlice";
import { setLocalStorage } from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import { NotificationContext } from "../../App";
import animationSignIn from "../../assets/animation/signinAnimation.json";
import { useLottie } from "lottie-react";
import HomeHeader from "../Headers/HomeHeader";
import HomeFooter from "../Footers/HomeFooter";

const FormInputSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const options = {
    animationData: animationSignIn,
    loop: true,
  };
  const { View } = useLottie(options);
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        //Thực hiện lưu trữ localstorage sau khi đăng nhập thành công
        authService
          .signIn(values)
          .then((res) => {
            console.log(res);
            setLocalStorage("user", res.data.content);
            dispatch(getInfoUser(res.data.content));
            showNotification(
              "SignIn Successful, please wait a moment",
              "success",
              2000
            );
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            showNotification(err.response.data.message, "error");
          });
      },
    });

  return (
    <>
      <div className="border-b ">
        <HomeHeader />
      </div>
      <div className="py-8 my-5 sign-in-content">
        <div className="container mx-auto rounded-md ">
          <div className="flex h-screen items-center justify-around sign-in-form bg-white bg-opacity-60 rounded-lg">
            <div className="w-1/3">{View}</div>
            <div className="w-1/3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h1 className="text-3xl font-bold italic text-green-600">
                  Continue with your email
                </h1>
                <InputCustom
                  labelContent={"Email"}
                  placeholder={"Email or username"}
                  name={"email"}
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  onBlur={handleBlur}
                />
                <InputCustom
                  placeholder={"Your password"}
                  labelContent={"Password"}
                  name={"password"}
                  typeInput="password"
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  onBlur={handleBlur}
                />
                <div>
                  <button
                    type="submit"
                    className="inline-block w-full bg-green-600 text-white py-2 px-5 rounded-md hover:bg-green-700 duration-300"
                  >
                    Đăng nhập
                  </button>
                  <Link
                    to={"/sign-up"}
                    className="mt-3 inline-block underline duration-300 text-black"
                  >
                    Don't have an account? Join here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t pt-8">
        <HomeFooter />
      </div>
    </>
  );
};

export default FormInputSignIn;
