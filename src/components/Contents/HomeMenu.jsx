import React, { useEffect, useState } from "react";
import { congViecService } from "../../service/congViec.service";
import { Dropdown, Space } from "antd";
import { path } from "../../common/path";
import { Link } from "react-router-dom";
import { useData } from "../../hooks/useData";

const HomeMenu = () => {
  const [menuCongViec, setMenuCongViec] = useState([]);
  const { setData } = useData();

  useEffect(() => {
    congViecService.layMenuLoaiCongViec
      .then((res) => {
        setMenuCongViec(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex space-x-3 container mx-auto justify-between pt-2">
      {menuCongViec.map((item, index) => {
        const items = [
          {
            key: index,
            label: (
              <div className="flex flex-row gap-x-5">
                {item.dsNhomChiTietLoai.map((item, index) => (
                  <div className="space-y-3 hover:cursor-default" key={index}>
                    <p className="font-bold text-[15px]">{item.tenNhom}</p>
                    {item.dsChiTietLoai.map((item, index) => (
                      <div className="flex flex-col" key={index}>
                        <Link
                          className="hover:text-green-600"
                          to={`${path.listJob}?tenCongViec=${encodeURIComponent(
                            item.tenChiTiet
                          )}`}
                          key={index}
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
            ),
          },
        ];
        return (
          <div
            key={index}
            className="pb-2 border-b-2 border-white hover:border-green-700 duration-300 hover:cursor-pointer"
          >
            <Dropdown
              menu={{
                items,
              }}
            >
              <Link
                to={`${path.typeJob}?tenLoaiCongViec=${encodeURIComponent(
                  item.tenLoaiCongViec
                )}`}
                onClick={() => {
                  setData(item);
                }}
              >
                {item.tenLoaiCongViec}
              </Link>
            </Dropdown>
          </div>
        );
      })}
    </div>
  );
};

export default HomeMenu;
