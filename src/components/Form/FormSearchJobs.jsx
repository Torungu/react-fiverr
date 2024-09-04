import React from "react";

const FormSearchJobs = () => {
  return (
    <>
      <form>
        <div className="flex items-center justify-between w-[500px] border rounded-md border-black pl-4">
          <input
            className="flex-1 focus:border-none focus:outline-none"
            type="text"
            placeholder="Nhập tên công việc cần kiếm"
          />
          <button type="submit" className="p-2 text-sm">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default FormSearchJobs;
