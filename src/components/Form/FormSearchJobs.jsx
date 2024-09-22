import React, { useEffect, useState } from "react";
import { path } from "../../common/path";
import { useNavigate } from "react-router-dom";

const FormSearchJobs = ({
  bgForm,
  bgButton,
  textButton,
  setOpenDropdown,
  handleGetValueChildren,
}) => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    if (setOpenDropdown && handleGetValueChildren) {
      if (!valueSearch) {
        setOpenDropdown(false);
      }
      handleGetValueChildren(valueSearch);
    }
  }, [valueSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenDropdown(false);
    navigate(`${path.listJob}?tenCongViec=${valueSearch}`);
  };

  const handleChange = (e) => {
    setOpenDropdown(true);
    setValueSearch(e.target.value);
  };

  return (
    <>
      <form className={bgForm} onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-[500px] p-2">
          <input
            className="flex-1 focus:border-none focus:outline-none"
            type="text"
            placeholder="Nhập tên công việc cần kiếm"
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`p-2 text-sm ${bgButton} rounded-md px-3 ${textButton}`}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default FormSearchJobs;
