import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { congViecService } from "../../service/congViec.service";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";

const WrapperSuggestJob = ({ children }) => {
  const [items, setItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 1000);

  const handleGetValueChildren = (valueChildren) => {
    setValue(valueChildren);
  };

  const clonedChildren = React.cloneElement(children, {
    setOpenDropdown,
    handleGetValueChildren,
  });

  useEffect(() => {
    if (value) {
      congViecService
        .layCongViecTheoTen(value)
        .then((res) => {
          let newItems = res.data.content.slice(0, 4).map((item, index) => {
            return {
              key: index.toString(),
              label: (
                <Link
                  className="flex items-center space-x-4"
                  to={`${path.detailJob}?chiTietCongViec=${item.congViec?.id}`}
                >
                  <img src={item.congViec?.hinhAnh} className="h-24" alt="" />
                  <div>
                    <h4 className="font-bold">{item.congViec?.tenCongViec}</h4>
                    <p className="text-green-600">
                      Price: {item.congViec?.giaTien} $
                    </p>
                    <p className="flex flex-row items-center gap-x-1 text-yellow-600">
                      Reviews: {item.congViec?.saoCongViec}
                      <i class="fa-solid fa-star"></i>
                      <span className="text-gray-500">
                        ({item.congViec?.danhGia})
                      </span>
                    </p>
                  </div>
                </Link>
              ),
            };
          });
          setItems(newItems);
          setOpenDropdown(true);
        })
        .catch((err) => {
          console.log(err);
          setOpenDropdown(false);
        });
    }
  }, [debounceValue]);

  useEffect(() => {
    const handleScroll = () => {
      setOpenDropdown(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Dropdown
      menu={{
        items,
      }}
      open={openDropdown}
    >
      {clonedChildren}
    </Dropdown>
  );
};

export default WrapperSuggestJob;
