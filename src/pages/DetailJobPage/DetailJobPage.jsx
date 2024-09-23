import React, { useEffect, useState } from "react";
import HomeFooter from "../../components/Footers/HomeFooter";
import HomeHeader from "../../components/Headers/HomeHeader";
import HomeMenu from "../../components/Contents/HomeMenu";
import { path } from "../../common/path";
import { Link, useSearchParams } from "react-router-dom";
import { congViecService } from "../../service/congViec.service";
import { binhLuanService } from "../../service/binhLuan.service";
import Sticky from "react-stickynode";

const DetailJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [detailJob, setDetailJob] = useState([]);
  const [binhLuan, setBinhLuan] = useState([]);

  useEffect(() => {
    let chiTietCongViec = searchParam.get("chiTietCongViec");
    congViecService
      .layCongViecChiTiet(chiTietCongViec)
      .then((res) => setDetailJob(res.data.content))
      .catch((err) => console.log(err));
  }, [searchParam]);

  useEffect(() => {
    let chiTietCongViec = searchParam.get("chiTietCongViec");
    binhLuanService
      .layBinhLuanTheoCongViec(chiTietCongViec)
      .then((res) => setBinhLuan(res.data.content))
      .catch((err) => console.log(err));
  }, [searchParam]);

  const jobDetails = detailJob ? detailJob[0] : null;

  const {
    tenLoaiCongViec,
    tenNhomChiTietLoai,
    tenChiTietLoai,
    avatar,
    tenNguoiTao,
  } = jobDetails || {};

  return (
    <>
      <div>
        <div className="border-b">
          <HomeHeader wrapper={true} />
        </div>
        <div className="border-b">
          <HomeMenu />
        </div>
      </div>
      <div className="py-5 container mx-auto space-y-5">
        <div className="grid grid-cols-2 items-center">
          <div className="space-y-5 pe-5">
            <div className="flex flex-row items-center text-blue-600 space-x-2">
              <p>{tenLoaiCongViec}</p>
              <i className="fa-solid fa-angle-right"></i>
              <p>{tenNhomChiTietLoai}</p>
              <i className="fa-solid fa-angle-right"></i>
              <p>{tenChiTietLoai}</p>
            </div>
            <h1>{jobDetails?.congViec.tenCongViec}</h1>
            <div className="flex flex-row items-center space-x-2 border-b pb-2">
              <img src={avatar} className="w-10 rounded-full" alt="" />
              <p className="font-bold">{tenNguoiTao}</p>
              <p className="text-yellow-600">
                {jobDetails?.congViec.saoCongViec}{" "}
                <i className="fa-solid fa-star"></i>
              </p>
              <p className="text-gray-600">
                Reviews: {`( ${jobDetails?.congViec.danhGia} )`}
              </p>
            </div>
            <img
              src={jobDetails?.congViec.hinhAnh}
              className="w-3/4 rounded-md"
              alt=""
            />
          </div>
          <Sticky bottomBoundary={1200}>
            <div className="border rounded-md p-5 space-y-3 h-fit">
              <ul className="space-y-2">
                <h1 className="text-2xl font-bold uppercase">We Offers:</h1>
                {jobDetails?.congViec.moTaNgan
                  .split("\r\n")
                  .filter((item) => item.trim())
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-green-700"
                    >
                      <i className="fa-solid fa-check"></i>
                      <span className="text-black">{item}</span>
                    </li>
                  ))}
              </ul>
              <Link to={path.signUp}>
                <button className="text-white bg-green-600 px-2 py-3 rounded-md mt-5">
                  Continue: {jobDetails?.congViec.giaTien} $
                </button>
              </Link>
            </div>
          </Sticky>
        </div>
        <div className="space-y-5 w-1/2 pe-10">
          <h1 className="font-semibold text-3xl">Job Description</h1>
          <div className="space-y-4">
            {jobDetails?.congViec.moTa
              .split("\r\n")
              .filter((item) => item.trim())
              .map((item, index) => (
                <p key={index}>{item}</p>
              ))}
          </div>
        </div>
        <div className="space-y-5 w-1/2 pe-10">
          <h1 className="font-semibold text-3xl">About The Seller</h1>
          <div className="space-y-4 flex items-center gap-4">
            <img src={avatar} className="w-[120px] rounded-full" alt="" />
            <div className="">
              <p>{tenNguoiTao}</p>
              <p className="text-yellow-600">
                {jobDetails?.congViec.saoCongViec}{" "}
                <i className="fa-solid fa-star"></i>
              </p>
              <p className="text-gray-600">
                Reviews: {`( ${jobDetails?.congViec.danhGia} )`}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-5 pe-10 border-t pt-2 w-1/2">
          <h1 className="font-semibold text-xl">Comments</h1>
          {binhLuan?.slice(0, 4).map((item, index) => (
            <div key={index} className="flex gap-3">
              <img
                src={item.avatar}
                className="w-[25px] h-[25px] rounded-full "
                alt=""
              />
              <div className="space-y-2">
                <p>
                  {item.tenNguoiBinhLuan}{" "}
                  <span className="text-yellow-500">
                    {item.saoBinhLuan} <i className="fa-solid fa-star"></i>
                  </span>
                </p>
                <p>{item.noiDung}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-8 mt-8 ">
        <HomeFooter />
      </div>
    </>
  );
};

export default DetailJobPage;
