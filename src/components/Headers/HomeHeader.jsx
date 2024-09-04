import React from "react";
import LogoIcon from "../Icons/LogoIcon";
import FormSearchJobs from "../Form/FormSearchJobs";

const HomeHeader = () => {
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
              <a href="" className="hover:text-green-600 duration-300">
                Sign In
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-green-600 border border-green-600 py-2 px-4 rounded-md hover:bg-green-600 hover:text-white duration-300"
              >
                Join
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
