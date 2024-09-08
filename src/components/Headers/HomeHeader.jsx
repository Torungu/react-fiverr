import React from "react";
import LogoIcon from "../Icons/LogoIcon";
import FormSearchJobs from "../Form/FormSearchJobs";
import { useDispatch } from "react-redux";
import { openSignInForm, openSignUpForm } from "../../redux/authSlice";

const HomeHeader = ({ checkForm }) => {
  const dispatch = useDispatch();
  return (
    <header className="py-5">
      <div className="container mx-auto">
        <div className="header_content flex items-center justify-between">
          <div className="header_logo flex items-center space-x-5">
            <a>
              <LogoIcon width={89} height={27} />
            </a>
            <FormSearchJobs />
          </div>
          <ul className="list-none flex items-center justify-between space-x-5 font-semibold">
            <li>
              <a href="" className="hover:text-green-600 duration-300">
                Become a Seller
              </a>
            </li>
            <li>
              <button className="hover:text-green-600 duration-300" onClick={() => {
                dispatch(openSignInForm(true));
                checkForm(true);

              }}>
                Sign In
              </button>
            </li>
            <li>
              <button
                href=""
                className="text-green-600 border border-green-600 py-2 px-4 rounded-md hover:bg-green-600 hover:text-white duration-300"
                onClick={() => {
                  dispatch(openSignUpForm(true));
                  checkForm(false);
                }}>
                Join

              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
