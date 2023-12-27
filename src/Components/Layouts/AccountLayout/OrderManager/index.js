import React, { useEffect, useState } from "react";
import { Input } from "antd";
import convertMoney from "../../../Utils/ConvertMoney";
import priceSale from "../../../Utils/ConvertPriceSale";
import useDebounced from "../../../hooks/useDebounced";
import emptyProduct from "../../StoreIcons/boxEmpty.png";
const { Search } = Input;
const STATUS_ORDER = [
  {
    color: "text-red-400",
    name: "Đơn hàng đã đặt",
  },
  {
    color: "text-yellow-400",
    name: "Tiếp nhận và xử lý",
  },
  {
    color: "text-violet-400",
    name: "Đang giao hàng",
  },
  {
    color: "text-green-400",
    name: "Đã giao hàng",
  },
];
function OrderManager({ Data, setTab, setDetailOrder }) {
  const [orders, setOrders] = useState(Data.orders);
  const [valueSearch, setValueSearch] = useState("");
  const val = useDebounced(valueSearch);
  useEffect(() => {
    if (val.trim()) {
      const result = Data.orders.filter((item) =>
        item.id.toString().includes(val)
      );
      setOrders(result);
      return;
    }
    setOrders(Data.orders);
  }, [val]);
  const handelOpenDetailOrder = (data) => {
    setTab(4);
    setDetailOrder(data);
  };
  return (
    <div className="bg-white rounded-md p-4 lg:w-3/4 w-full">
      <h1 className="font-semibold text-2xl mb-3">Quản lý đơn hàng</h1>
      <Search
        placeholder="Tìm kiếm đơn hàng theo mã"
        value={valueSearch}
        allowClear
        enterButton={
          <button className="bg-blue-500 text-white p-2 rounded-md rounded-l-none hover:opacity-70">
            Tìm kiếm
          </button>
        }
        size="middle"
        onChange={(e) => setValueSearch(e.target.value)}
      />
      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="mt-5">
              <div className="flex items-center justify-between">
                <span className="font-medium">Mã đơn hàng: {order.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handelOpenDetailOrder(order)}
                    className="p-1 rounded-md text-blue-500 border border-blue-500"
                  >
                    Xem chi tiết
                  </button>
                  <div
                    className={`p-1 font-medium ${
                      STATUS_ORDER[order.statusOrder - 1].color
                    }`}
                  >
                    {STATUS_ORDER[order.statusOrder - 1].name}
                  </div>
                </div>
              </div>
              <div>
                {order.items.map((item, i) => (
                  <>
                    <div key={i}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative ">
                            <img
                              className="w-24 object-cover rounded-md"
                              src={item.image}
                              alt={item.title}
                            ></img>
                            <p className="absolute bottom-0 right-0 p-1 pr-2 pl-2 rounded-md bg-slate-200 text-black font-medium">
                              x{item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-base">
                            {item.title}
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-medium ">
                            {convertMoney(
                              priceSale(item.oldPrice, item.saleRate)
                            )}
                          </p>
                          <p className="text-base line-through ">
                            {convertMoney(item.oldPrice)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="flex justify-end items-center w-fulls">
                <span className="font-medium">Tổng tiền: </span>
                <span className="ml-2 text-lg font-semibold text-red-500 ">
                  {convertMoney(order.totalPrice)}
                </span>
              </div>
              <div className="border border-gray-300 mt-2"></div>
            </div>
          ))
        ) : (
          <div className="flex items-center flex-col mt-5">
            <img src={emptyProduct} alt="emptyProdcut" className="w-36" />
            <h2 className="font-medium">Không tìm thấy đơn hàng nào</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderManager;
