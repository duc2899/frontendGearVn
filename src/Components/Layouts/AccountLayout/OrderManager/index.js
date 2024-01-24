import React, { useEffect, useState } from "react";
import { Input, Dropdown, Button, Pagination } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import convertMoney from "../../../Utils/ConvertMoney";
import priceSale from "../../../Utils/ConvertPriceSale";
import useDebounced from "../../../hooks/useDebounced";
import emptyProduct from "../../StoreIcons/boxEmpty.png";
import { getBillService } from "../../../Services/BIllServices/GetBillService";

const { Search } = Input;
const items = [
  {
    key: "1",
    name: "Đơn hàng đã đặt",
    label: <p className="text-blue-400">Đơn hàng đã đặt</p>,
  },
  {
    key: "2",
    name: "Tiếp nhận và xử lý",
    label: <p className="text-yellow-400">Tiếp nhận và xử lý</p>,
  },
  {
    key: "3",
    name: "Đang giao hàng",
    label: <p className="text-violet-400">Đang giao hàng</p>,
  },
  {
    key: "4",
    name: "Đã giao hàng",
    label: <p className="text-green-400">Đã giao hàng</p>,
  },
  {
    key: "5",
    name: "Đơn hàng bị hủy",
    label: <p className="text-red-400">Đơn hàng bị hủy</p>,
  },
  {
    key: "6",
    name: "Tất cả",
    label: <p>Tất cả</p>,
  },
];
const STATUS_ORDER = [
  {
    color: "text-blue-400",
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
function OrderManager({ idUser, setTab, setDetailOrder }) {
  const [orders, setOrders] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const val = useDebounced(valueSearch);
  const getBillAPI = async (idUser) => {
    const res = await getBillService(idUser);
    setOrders(res.data.reverse());
  };
  const filterBillAPI = async (idUser, statusBill) => {
    const res = await getBillService(idUser);
    if (statusBill == 5) {
      return setOrders(res.data.filter((order) => order.isCancelOrder));
    }
    setOrders(
      res.data.filter(
        (order) => order.statusBill == statusBill && !order.isCancelOrder
      )
    );
  };
  const findBillByIdAPI = async (idUser, idBill) => {
    const res = await getBillService(idUser);
    setOrders(res.data.filter((order) => order.id == idBill));
  };

  useEffect(() => {
    if (val) {
      findBillByIdAPI(idUser, val);
      return;
    }
    getBillAPI(idUser);
  }, [val]);

  const handelOpenDetailOrder = (data) => {
    setTab(4);
    setDetailOrder(data);
  };
  const handelOnclickFilter = (e) => {
    if (e.key <= 5 && e.key > 0) {
      setFilterStatus(e.item.props.name);
      return filterBillAPI(idUser, e.key);
    }
    getBillAPI(idUser);
    setFilterStatus(e.item.props.name);
  };

  return (
    <div className="bg-white rounded-md p-4 lg:w-3/4 w-full">
      <h1 className="font-semibold text-2xl mb-3">Quản lý đơn hàng</h1>
      <div className="flex items-center justify-between gap-3">
        <Search
          className="w-4/5"
          placeholder="Tìm kiếm đơn hàng theo mã"
          value={valueSearch}
          allowClear
          enterButton={
            <button className="bg-blue-500 text-white p-2 rounded-md rounded-l-none hover:opacity-70 ">
              Tìm kiếm
            </button>
          }
          size="middle"
          onChange={(e) => setValueSearch(e.target.value)}
        />
        <Dropdown
          menu={{
            onClick: handelOnclickFilter,
            items,
          }}
          trigger={"click"}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Button className="flex items-center">
            {filterStatus} <DownOutlined></DownOutlined>
          </Button>
        </Dropdown>
      </div>
      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="mt-5">
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-2 text-lg">
                  Mã đơn hàng:{" "}
                  <span className="text-orange-500 flex items-center">
                    #{order.id}
                    <span>
                      {order.isCancelOrder ? (
                        <div className="text-red-500 font-semibold">
                          - Đơn hàng đã bị hủy
                        </div>
                      ) : (
                        <div
                          className={`${
                            STATUS_ORDER[order.statusBill - 1].color
                          } ml-3 font-semibold`}
                        >
                          - {STATUS_ORDER[order.statusBill - 1].name}
                        </div>
                      )}
                    </span>
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handelOpenDetailOrder(order)}
                    className="p-1 rounded-md text-blue-500 border border-blue-500"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
              <div>
                {order.products.map((item, i) => (
                  <>
                    <div key={i}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative ">
                            <img
                              className="w-24 object-cover rounded-md"
                              src={item.image}
                              alt={item.name}
                            ></img>
                            <p className="absolute bottom-0 right-0 p-1 pr-2 pl-2 rounded-md bg-slate-200 text-black font-medium">
                              x{item.amount}
                            </p>
                          </div>
                          <p className="font-semibold text-base">{item.name}</p>
                        </div>
                        <div>
                          <p className="text-lg font-medium ">
                            {convertMoney(priceSale(item.price, item.saleRate))}
                          </p>
                          <p className="text-base line-through ">
                            {convertMoney(item.price)}
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
