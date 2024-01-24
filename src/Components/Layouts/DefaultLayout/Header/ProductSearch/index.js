import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useDebounced from "../../../../hooks/useDebounced";
import { getProductByName } from "../../../../Services/ProductsServices/getProductByNameService";
import { Link } from "react-router-dom";
import convertMoney from "../../../../Utils/ConvertMoney";
import priceSale from "../../../../Utils/ConvertPriceSale";
import { Empty } from "antd";

const ProductSearch = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const val = useDebounced(search);
  useEffect(() => {
    if (val.trim() && !containsSpecialCharacter(val.trim())) {
      const fetchAPI = async () => {
        const res = await getProductByName(val);
        setData(res);
        setShow(true);
      };
      fetchAPI();
    }
    setData([]);
    setShow(false);
  }, [val]);
  const handelOnKeyDown = (e) => {
    if (e.keyCode === 27) {
      // tab value is 9
      setShow(false);
    }
  };
  const handelFocus = () => {
    if (data.length <= 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const containsSpecialCharacter = (str) => {
    var regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return regex.test(str);
  };

  return (
    <div
      onBlur={() => setShow(false)}
      onFocus={handelFocus}
      onKeyDown={handelOnKeyDown}
      className="relative bg-white rounded-md lg:w-5/12 w-full flex justify-between items-center px-3 mr-3"
    >
      <input
        className="bg-white outline-none border-none p-2 rounded-md w-full"
        placeholder="Bạn cần tìm gì?"
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchIcon className="cursor-pointer hover:text-red-400 transition-colors"></SearchIcon>
      <div
        className={`${
          show ? "block" : "hidden"
        } absolute inset-x-0 bg-white rounded-md shadow-md h-52 overflow-auto transition-transform`}
        style={{ bottom: "-210px" }}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <Link
              to={`/details/${item.category}/${item.id}`}
              className="p-2 py-3 flex items-center justify-between gap-x-2 border-b-2 hover:bg-red-100 transition-colors"
              key={item.id}
            >
              <div className="whitespace-pre overflow-hidden">
                <p className="text-xs font-semibold">{item.title}</p>
                <div>
                  <span className="text-red-700 text-sm font-semibold mr-2">
                    {convertMoney(priceSale(item.oldPrice, item.saleRate))}
                  </span>
                  <del className="text-xs font-normal text-sl">
                    {convertMoney(item.oldPrice)}
                  </del>
                </div>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-9 h-9 object-contain border cursor-pointer"
              />
            </Link>
          ))
        ) : (
          <Empty
            description="Không tìm thấy sản phẩm phù hợp"
            className="mt-3"
          ></Empty>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
