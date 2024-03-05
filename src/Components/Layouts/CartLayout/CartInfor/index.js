import React from "react";
import convertMoney from "../../../Utils/ConvertMoney";
import priceSale from "../../../Utils/ConvertPriceSale";
import { actionCartService } from "../../../Services/CartServices/ActionsCartService";
import { getCartService } from "../../../Services/CartServices/GetCartService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartInfor({
  CartData,
  onChange,
  totalOrder,
  idUser,
  setDataCart,
  setReload,
}) {
  const handelActionCart = (amount, id) => {
    const fetchAPI = async () => {
      const data = {
        idUser: idUser,
        amount: amount,
        id_product: id,
      };
      const res = await actionCartService(data);
      if (res.status === 200) {
        const getCartAPI = async () => {
          const res = await getCartService(idUser);
          setDataCart(res.data);
          setReload(true);
        };
        getCartAPI();
      } else {
        toast.error("Hàng trong kho không đủ");
      }
    };
    fetchAPI();
  };

  return (
    <>
      <div className="mt-5 border-b-2 border-gray-300 mb-8">
        {CartData.map((item, index) => (
          <div
            key={index}
            className="flex justify-around items-center py-2 lg:flex-row flex-col"
          >
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain border"
              ></img>
              <div
                className="flex items-center justify-center mt-2 hover:text-red-500 cursor-pointer transition-colors"
                onClick={() => handelActionCart(-item.amount, item.idProduct)}
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
                <span className="ml-1 text-sm">Xóa</span>
              </div>
            </div>
            <div>
              <a href={`details/${item.nameCategory}/${item.idProduct}`}>
                {item.title}
              </a>
            </div>
            <div className="">
              <p className="font-semibold text-red-500 text-xl">
                {convertMoney(priceSale(item.oldPrice, item.saleRate))}
              </p>
              <del className="text-gray-500 text-sm">
                {convertMoney(item.oldPrice)}
              </del>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handelActionCart(-1, item.idProduct)}
                  className="border rounded-tl-md rounded-bl-md bg-white px-2 h-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  disabled
                  value={item.amount}
                  className="text-center w-12 border border-t border-b h-8 border-r-transparent border-l-transparent"
                />
                <button
                  onClick={() => handelActionCart(1, item.idProduct)}
                  className="border rounded-tr-md rounded-br-md bg-white px-2 h-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <div className="flex justify-between">
          <p className="font-semibold text-lg">Tổng tiền:</p>
          <p className="text-red-500 font-bold text-xl">
            {convertMoney(totalOrder)}
          </p>
        </div>
        <button
          onClick={onChange}
          className="p-3 w-full mt-2 bg-red-600 rounded-sm text-white font-semibold hover:opacity-80 disabled:opacity-70 transition-opacity"
        >
          ĐẶT HÀNG NGAY
        </button>
      </div>
    </>
  );
}

export default CartInfor;
