import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { congViecService } from "../../service/congViec.service";
import HomeHeader from "../../components/Headers/HomeHeader";
import HomeMenu from "../../components/Contents/HomeMenu";
import HomeFooter from "../../components/Footers/HomeFooter";
import { Pagination } from "antd";
import { useData } from "../../hooks/useData";
import { path } from "../../common/path";

const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [listJob, setListJob] = useState([]);
  const { data } = useData();

  useEffect(() => {
    let tenCongViec = searchParam.get("tenCongViec");
    congViecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        setListJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParam]);

  useEffect(() => {
    congViecService
      .layCongViecTheoChiTietLoai(data?.id)
      .then((res) => {
        setListJob(res.data.content);
      })
      .catch((err) => console.log(err));
  }, [data]);

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
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold">
          Danh sách công việc: "
          {searchParam.get("tenCongViec") ? searchParam.get("tenCongViec") : ""}
          "
        </h1>
        <div className="grid grid-cols-4 gap-10 mt-10">
          {listJob.map((item, index) => {
            return (
              <Link
                className="space-y-4 border rounded-md p-3 hover:cursor-pointer hover:scale-105 duration-300"
                key={index}
                to={`${path.detailJob}?chiTietCongViec=${item.congViec?.id}`}
              >
                <img src={item.congViec?.hinhAnh} className="w-full" alt="" />
                <div className="flex items-center space-x-3">
                  <img
                    src={item.avatar}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <h4 className="font-bold text-lg">{item.tenNguoiTao}</h4>
                </div>
                <div className="h-12">
                  <h3>{item.congViec?.tenCongViec}</h3>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <p>
                    <span className="text-yellow-400 space-x-2">
                      <i className="fa-solid fa-star"></i>
                      {item.congViec?.saoCongViec}
                    </span>{" "}
                    <span className="text-gray-400">
                      ({item.congViec?.danhGia})
                    </span>
                  </p>
                  <p className="uppercase text-sm">
                    Starting at{" "}
                    <span className="text-lg font-bold text-green-600">
                      {item.congViec?.giaTien}$
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Pagination align="center" defaultCurrent={1} total={50} />
      <div className="border-t pt-8 mt-8">
        <HomeFooter />
      </div>
    </div>
  );
};

export default ListJobPage;
