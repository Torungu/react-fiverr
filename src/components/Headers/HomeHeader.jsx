import React from "react";
import LogoIcon from "../Icons/LogoIcon";
import FormSearchJobs from "../Form/FormSearchJobs";
import { useDispatch } from "react-redux";
import { openSignInForm, openSignUpForm } from "../../redux/authSlice";
import WrapperSuggestJob from "../Wrapper/WrapperSuggestJob";
import { Link } from "react-router-dom";
import { path } from "../../common/path";

const HomeHeader = ({ checkForm, wrapper }) => {
  const dispatch = useDispatch();
  return (
    <header className="py-5">
      <div className="container mx-auto">
        <div className="header_content flex items-center justify-between">
          <div className="header_logo flex items-center space-x-5">
            <Link to={path.homePage}>
              <LogoIcon width={89} height={27} />
            </Link>
            {wrapper ? (
              <div className="border rounded-md">
                <WrapperSuggestJob>
                  <FormSearchJobs
                    bgForm={"bg-white rounded-md"}
                    bgButton={"bg-black"}
                    textButton={"text-white"}
                  />
                </WrapperSuggestJob>
              </div>
            ) : (
              <div className="border rounded-md invisible">
                <WrapperSuggestJob>
                  <FormSearchJobs
                    bgForm={"bg-white rounded-md"}
                    bgButton={"bg-black"}
                    textButton={"text-white"}
                  />
                </WrapperSuggestJob>
              </div>
            )}
          </div>
          <ul className="list-none flex items-center justify-between space-x-5 font-semibold">
            <li>
              <Link
                className="hover:text-green-600 duration-300"
                to={path.adminLoginPage}
              >
                Become an Admin
              </Link>
            </li>
            <li>
              <Link
                type="button"
                className="hover:text-green-600 duration-300"
                onClick={() => {
                  dispatch(openSignInForm(true));
                  checkForm(true);
                }}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                type="button"
                className="text-green-600 border border-green-600 py-2 px-4 rounded-md hover:bg-green-600 hover:text-white duration-300"
                onClick={() => {
                  dispatch(openSignUpForm(true));
                  checkForm(false);
                }}
              >
                Join
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
