/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import priceSale from "../../../Utils/ConvertPriceSale";
import convertMoney from "../../../Utils/ConvertMoney";
import { getFavoriteProductService } from "../../../Services/FavoriteServices/GetFavoriteProductService";
import { UserContext } from "../../../Context/AccountUser";

import { deleteFavoriteProductService } from "../../../Services/FavoriteServices/DeleteFavoriteProductService";
import { toast } from "react-toastify";
import { Empty } from "antd";
function FavoriteProduct() {
  const { userAccount } = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    getFavoriteProductService(userAccount.id).then((d) => {
      setData(d.data);
    });
  }, []);
  const handelDeleteFavoriteProduct = (id) => {
    deleteFavoriteProductService(id).then((d) => {
      if (d.status === 200) {
        toast.success("Xóa sản phẩm thành công");
        getFavoriteProductService(userAccount.id).then((d) => {
          setData(d.data);
        });
      } else {
        toast.error(d.message);
      }
    });
  };
  return (
    <div className="bg-white rounded-md p-4 w-3/4 max-sm:w-full min-h-96">
      <h2 className="font-semibold text-2xl">Sản phẩm yêu thích</h2>
      {data.length > 0 ? (
        <div className="lg:grid lg:grid-cols-4 gap-4 mt-3 md:grid md:grid-cols-2 sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:items-center">
          {data.map((item) => (
            <div key={item.id} className="cursor-pointer">
              <div className="w-4/5 h-32 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain hover:scale-115 overflow-hidden transition-all"
                />
                <button
                  onClick={() => handelDeleteFavoriteProduct(item.id)}
                  className="absolute top-0 right-0 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <a
                href={`${window.location.protocol}//${window.location.host}/details/${item.type}/${item.idProduct}`}
              >
                <p className="font-medium text-sm truncate hover:text-red-500">
                  {item.title}
                </p>
              </a>
              <del className="text-gray-400 text-sm">
                {convertMoney(item.oldPrice)}
              </del>
              <div className="flex items-center gap-3">
                <div className=" text-red-500 text-sm font-semibold">
                  {convertMoney(priceSale(item.oldPrice, item.saleRate))}
                </div>
                <div className="border text-xs font-medium border-red-500 p-0.5 bg-red-200 rounded-md text-red-500">
                  {item.saleRate * 100}%
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          className="h-full flex flex-col mt-20"
          description="Chưa có sản phẩm"
        ></Empty>
      )}
    </div>
  );
}

export default FavoriteProduct;
