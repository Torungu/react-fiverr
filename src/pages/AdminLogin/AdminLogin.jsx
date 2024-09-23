import React, { useContext } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { useFormik } from "formik";
import { authService } from "../../service/auth.service";
import { NotificationContext } from "../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { Outlet, useNavigate } from "react-router-dom";
import { getInfoUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useLottie } from "lottie-react";
import animationSignIn from "../../assets/animation/signinAnimation.json";
import HomeHeader from "../../components/Headers/HomeHeader";
import HomeFooter from "../../components/Footers/HomeFooter";

const AdminLogin = ({ checkForm }) => {
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        // console.log(values);
        authService
          .signIn(values)
          .then((res) => {
            console.log(res);
            if (res.data.content.user.role == "USER") {
              showNotification("Bạn không có quyền đăng nhập", "error");
              let soLanViPham = getLocalStorage("viPham");
              if (!soLanViPham) {
                setLocalStorage("viPham", 1);
              } else {
                soLanViPham++;
                soLanViPham == 3
                  ? (window.location.href = "https://google.com")
                  : setLocalStorage("viPham", soLanViPham);
              }
            } else {
              setLocalStorage("user", res.data.content);
              dispatch(getInfoUser(res.data.content));
              navigate("/admin/manager-user");
            }
          })
          .catch((err) => {
            console.log(err);
            showNotification(
              "Có lỗi xảy ra vui lòng thử lại hoặc liên hệ bộ phận khách hàng",
              "error"
            );
          });
      },
    });
  const options = {
    animationData: animationSignIn,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <>
      <div className="border-b">
        <HomeHeader checkForm={checkForm} />
      </div>
      <Outlet />
      <div className="container mx-auto">
        <div className="admin_login flex h-full">
          <div className="admin_logn_image w-1/2">{View}</div>
          <div className="admin_login_form w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Đăng nhập dành cho admin</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputCustom
                name="email"
                labelContent="Email"
                value={values.email}
                onChange={handleChange}
              />
              <InputCustom
                name="password"
                labelContent="Mật khẩu"
                typeInput="password"
                onChange={handleChange}
                value={values.password}
              />
              <div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-md w-full block bg-black text-white"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t pt-8 mt-8">
        <HomeFooter />
      </div>
    </>
  );
};

export default AdminLogin;
