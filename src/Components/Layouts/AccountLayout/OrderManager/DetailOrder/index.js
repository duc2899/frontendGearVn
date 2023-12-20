import React from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import cardUser from "../../../StoreIcons/cardUser.png";
import paymentMethod from "../../../StoreIcons/payment-method.png";
import productInfor from "../../../StoreIcons/productInfor.png";
import { Steps } from "antd";
import convertMoney from "../../../../Utils/ConvertMoney";
import priceSale from "../../../../Utils/ConvertPriceSale";
function DetailOrder({ detailOrder, setTab }) {
  return (
    <div className="bg-white rounded-md p-4 lg:w-3/4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">
          Chi tiết đơn hàng {detailOrder.id}
        </h2>
        <p className="text-base font-medium">
          Đặt lúc: {detailOrder.createdAt}
        </p>
      </div>
      <div className="mt-8">
        <Steps
          current={detailOrder.statusOrder - 1}
          labelPlacement="vertical"
          items={[
            {
              icon: <EventNoteIcon className="text-3xl" />,
              title: "Đơn hàng đã đặt",
            },
            {
              icon: <ManageAccountsIcon className="text-3xl" />,
              title: "Tiếp nhận và chờ xử lý",
            },
            {
              icon: <LocalShippingIcon className="text-3xl" />,
              title: "Đang giao hàng",
            },
            {
              icon: <HomeIcon className="text-3xl" />,
              title: "Đã giao hàng",
            },
          ]}
        />
      </div>
      <div className="flex items-stretch justify-between gap-4 mx-auto lg:flex-row flex-col">
        <div className="p-2 border border-gray-400 rounded-md lg:w-3/5 w-full">
          <div className="flex items-center justify-start gap-3 mb-3">
            <img src={cardUser} className="w-7 object-cover" alt="cardUser" />
            <p className="font-medium text-lg">Thông tin khách hàng</p>
          </div>
          <div className="flex items-center">
            <p className="w-1/4 font-medium mr-2">Người nhận:</p>
            <p className="w-3/4">{detailOrder.customer}</p>
          </div>
          <div className="flex items-center justify-start mt-2">
            <p className="w-1/4 font-medium mr-2 justify-self-start">
              Địa chỉ nhận hàng:
            </p>
            <p className="w-3/4">{detailOrder.address}</p>
          </div>
        </div>
        <div className="p-2 border border-gray-400 rounded-md lg:w-2/5 w-full">
          <div className="flex items-center justify-start gap-3 mb-3">
            <img
              src={paymentMethod}
              className="w-7 object-cover"
              alt="cardUser"
            />
            <p className="font-medium text-lg">Hình thức thanh toán</p>
          </div>
          <div className="flex items-center">
            <p className="w-3/4 font-medium mr-2">Phương thức thanh toán:</p>
            <p className="w-1/4 ">{detailOrder.paymentType}</p>
          </div>
          <div className="flex items-center">
            <p className="w-3/4 font-medium mr-2">Thanh toán tiền:</p>
            <p
              className={`w-1/4 font-medium ${
                detailOrder.isPay ? "text-green-500" : "text-orange-500"
              }`}
            >
              {detailOrder.isPay ? "Đã thanh toán" : "Chưa thanh toán"}
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 border border-gray-400 rounded-md mt-3 w-full">
        <div className="flex items-center justify-start gap-3 mb-3">
          <img src={productInfor} className="w-7 object-cover" alt="cardUser" />
          <p className="font-medium text-lg">Thông tin sản phẩm</p>
        </div>
        <div>
          {detailOrder.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-around lg:flex-nowrap flex-wrap"
            >
              <img
                src={item.image}
                className="w-20 object-cover rounded-md"
                alt={item.title}
              />
              <p className="font-medium ">{item.title}</p>
              <p className="text-base">Số lượng: {item.quantity}</p>
              <p className="text-red-500 font-medium">
                {convertMoney(priceSale(item.oldPrice, item.saleRate))}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center flex-col mt-4 text-base">
        <div className="flex items-center w-1/2">
          <p className="w-9/12 font-medium">Giá tạm tính:</p>
          <p className="w-12/12 font-medium">
            {convertMoney(detailOrder.totalPrice - detailOrder.priceDelivery)}
          </p>
        </div>
        <div className="flex items-center w-1/2">
          <p className="w-9/12 font-medium">Phí vận chuyển</p>
          <p className="w-12/12 font-medium">
            {detailOrder.priceDelivery <= 0
              ? "Miễn phí"
              : convertMoney(detailOrder.priceDelivery)}
          </p>
        </div>
        <div className="flex items-center w-1/2">
          <p className="w-9/12 font-medium">Tổng tiền</p>
          <p className="w-12/12 font-medium text-red-500">
            {convertMoney(detailOrder.totalPrice)}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-3">
        <button
          onClick={() => setTab(2)}
          className="bg-blue-500 rounded-md p-2 text-white hover:opacity-70"
        >
          Quay lại danh sách đơn hàng
        </button>
      </div>
    </div>
  );
}

export default DetailOrder;
