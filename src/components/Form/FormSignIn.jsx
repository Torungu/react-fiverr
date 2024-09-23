"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { openSignInForm, openSignUpForm } from "../../redux/authSlice";
import leftImage from "./../../assets/img/standard.0638957.png";
import { Link, useNavigate } from "react-router-dom";

const FormSignIn = ({ checkForm }) => {
  const dispatch = useDispatch();
  const { isSignInOpen, isSignUpOpen } = useSelector(
    (state) => state.authSlice
  );
  const navigate = useNavigate();

  return (
    <Dialog
      open={isSignInOpen ? isSignInOpen : isSignUpOpen}
      onClose={openSignInForm ? openSignInForm : openSignUpForm}
      className="relative z-10 w-screen"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="container relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-7/12 flex"
          >
            <button
              className="fa-solid fa-xmark absolute right-5 top-5 z-20"
              onClick={() => {
                dispatch(openSignInForm(false));
              }}
            ></button>
            <div className="w-6/12 img_content relative">
              <img src={leftImage} alt="err" />
              <div className="title_content absolute top-0 p-10 font-bold">
                <h1 className="text-white text-3xl">Success starts here</h1>
                <ul className="text-white mt-6 font-light">
                  <li className="my-4 text-lg">
                    <i className="fa-solid fa-check me-2 text-sm" />
                    <span>Over 700 categories</span>
                  </li>
                  <li className="my-4 text-lg">
                    <i className="fa-solid fa-check me-2 text-sm" />
                    <span>Quality work done faster</span>
                  </li>
                  <li className="my-4 text-lg">
                    <i className="fa-solid fa-check me-2 text-sm" />
                    <span>
                      Access to talent and businesses across the globe
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-6/12 relative p-10 flex flex-col justify-between">
              <div>
                <div className="my-6">
                  <h2 className="text-black text-2xl font-bold mb-3">
                    Sign in to your account
                  </h2>
                  <p className="font-light">
                    Don't have an account?{" "}
                    <button
                      className="underline"
                      onClick={() => {
                        dispatch(openSignInForm(false));
                        checkForm(false);
                        dispatch(openSignUpForm(true));
                      }}
                    >
                      Join here
                    </button>
                  </p>
                </div>

                <button
                  type="button"
                  className="px-5 py-2 rounded-md border w-full my-3 hover:bg-gray-200 flex justify-around items-center"
                  onClick={() => {
                    window.location.href = "https://accounts.google.com/";
                  }}
                >
                  <i className="fa-brands fa-google" />
                  Continue with Google
                </button>
                <button
                  className="px-5 py-2 rounded-md border w-full my-3 hover:bg-gray-200 flex justify-around items-center"
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/sign-in");
                    }, 1000);
                  }}
                >
                  <i className="fa-regular fa-envelope" />
                  Continue with email/username
                </button>
                <div className="text-center mt-4 mb-1">
                  <span className="text-xs text-gray-400">OR</span>
                </div>
                <br />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="px-5 py-2 rounded-md my-3 me-1 border hover:bg-gray-200 w-full flex justify-around items-center"
                    onClick={() => {
                      window.location.href = "https://www.icloud.com//";
                    }}
                  >
                    <i className="fa-brands fa-apple" />
                    Apple
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "https://www.facebook.com/";
                    }}
                    className="px-5 py-2 rounded-md my-3 border hover:bg-gray-200 w-full flex justify-around items-center"
                  >
                    <i className="fa-brands fa-facebook-f" />
                    Facebook
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs leading-[20px] text-gray-400">
                  By joining, you agree to the Fiverr{" "}
                  <Link className="underline" to={"/"}>
                    Terms of Service
                  </Link>{" "}
                  and to occasionally receive emails from us. Please read our{" "}
                  <Link className="underline" to={"/"}>
                    Privacy Policy
                  </Link>{" "}
                  to learn how we use your personal data.
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default FormSignIn;
