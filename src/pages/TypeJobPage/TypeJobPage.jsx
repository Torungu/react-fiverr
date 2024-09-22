import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/Headers/HomeHeader";
import HomeMenu from "../../components/Contents/HomeMenu";
import HomeFooter from "../../components/Footers/HomeFooter";
import { Link, useSearchParams } from "react-router-dom";
import SlickCarousel from "../../components/Carousel/SlickCarousel";
import { useData } from "../../hooks/useData";
import { congViecService } from "../../service/congViec.service";
import { path } from "../../common/path";

const TypeJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams("");
  const [typeJob, setTypeJob] = useState([]);
  const { data } = useData();
  const { setData } = useData();

  useEffect(() => {
    congViecService
      .layChiTietMaLoaiCongViec(data?.id)
      .then((res) => setTypeJob(res.data.content))
      .catch((err) => console.log(err));
  }, [searchParam.get("tenLoaiCongViec")]);

  return (
    <div className="space-y-8">
      <div>
        <div className="border-b">
          <HomeHeader wrapper={true} />
        </div>
        <div className="border-b">
          <HomeMenu />
        </div>
      </div>
      <div className="space-y-8">
        <div className="container mx-auto type-job-title bg-green-700 text-center rounded-md space-y-6 py-8 text-white">
          <h1 className="text-5xl font-bold uppercase italic">
            {searchParam.get("tenLoaiCongViec")
              ? searchParam.get("tenLoaiCongViec")
              : ""}
          </h1>
          <p className="font-semibold text-2xl">We are looking for you !</p>
          <button className="space-x-3 items-center border-2 border-white p-3 rounded-md hover:bg-white hover:text-green-700 duration-300">
            <i className="fa-regular fa-circle-play"></i> How Fiverr Works
          </button>
        </div>
        <div className="container mx-auto py-5">
          <h1 className="text-3xl font-semibold">
            Explore{" "}
            {searchParam.get("tenLoaiCongViec")
              ? searchParam.get("tenLoaiCongViec")
              : ""}
          </h1>
          <div className="flex flex-row space-x-5 py-5">
            {typeJob[0]?.dsNhomChiTietLoai.map((item, index) => (
              <div key={index} className="w-1/4 space-y-5 cursor-pointer">
                <img
                  src={item.hinhAnh}
                  className="h-40 border-white rounded-md"
                  alt=""
                />
                <h1 className="text-lg font-bold">{item.tenNhom}</h1>
                {item.dsChiTietLoai.map((item, index) => (
                  <div className="flex flex-col gap-3" key={index}>
                    <Link
                      className="text-gray-700 py-2 hover:bg-gray-100 hover:scale-105 duration-300 rounded-sm cursor-pointer"
                      to={`${path.listJob}?tenCongViec=${encodeURIComponent(
                        item.tenChiTiet
                      )}`}
                      onClick={() => {
                        setData(item);
                      }}
                    >
                      {item.tenChiTiet}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto space-y-6 py-24">
            <h1 className="text-3xl font-semibold text-center">
              {searchParam.get("tenLoaiCongViec")
                ? searchParam.get("tenLoaiCongViec")
                : " "}
              {"  "}
              FAQ
            </h1>
            <p className="flex justify-between items-center border-b pb-4">
              What is{" "}
              {searchParam.get("tenLoaiCongViec")
                ? searchParam.get("tenLoaiCongViec")
                : ""}{" "}
              ? <i className="fa-solid fa-chevron-down"></i>
            </p>
            <p className="flex justify-between items-center border-b pb-4">
              What type of services can i find in{" "}
              {searchParam.get("tenLoaiCongViec")
                ? searchParam.get("tenLoaiCongViec")
                : ""}{" "}
              ? <i className="fa-solid fa-chevron-down"></i>
            </p>
            <p className="flex justify-between items-center border-b pb-4">
              Do I need to prepare something ?{" "}
              <i className="fa-solid fa-chevron-down"></i>
            </p>
            <p className="flex justify-between items-center border-b pb-4">
              How do I find good freelancers on Fiverr?{" "}
              <i className="fa-solid fa-chevron-down"></i>
            </p>
          </div>
        </div>
        <div className="container mx-auto space-y-5">
          <h1 className="text-3xl font-semibold">
            Things you might be interesting
          </h1>
          <SlickCarousel />
        </div>
      </div>
      <div className="border-t pt-8 mt-8">
        <HomeFooter />
      </div>
    </div>
  );
};

export default TypeJobPage;
