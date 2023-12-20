import React, { useState } from "react";
import convertMoney from "../../../Utils/ConvertMoney";
import paymentOnline from "../../StoreIcons/paymentOnlie.png";
import paymentOffline from "../../StoreIcons/deliveryMan.png";
const PaymentInfor = ({ Data, onChange, dataOrder, setDataOrder }) => {
  const type = [
    {
      id: 0,
      typeName: "Thanh toán khi giao hàng (COD)",
      icon: (
        <img
          src={paymentOffline}
          style={{ width: `30px` }}
          alt="paymentOffline"
        ></img>
      ),
    },

    {
      id: 1,
      typeName: "Thanh toán online",
      icon: (
        <img
          style={{ width: `30px` }}
          src={paymentOnline}
          alt="paymentOnline"
        ></img>
      ),
    },
  ];
  const [typePayment, setTypePayment] = useState(0);

  return (
    <div className="p-2">
      <div>
        <h2 className="font-medium text-2xl">Thông tin đặt hàng</h2>
        <div className="flex items-center mt-2">
          <div className="font-semibold  w-1/4">Khách hàng:</div>
          <span className="font-normal  w-3/4">{dataOrder.name}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="font-semibold  w-1/4">Số điện thoại:</div>
          <span className="font-normal  w-3/4">{dataOrder.phone}</span>
        </div>
        <div className="flex items-start mt-2">
          <div className="font-semibold w-1/4">Địa chỉ nhận hàng:</div>
          <div className="font-normal w-3/4">
            {dataOrder.addressHome +
              ", " +
              dataOrder.ward.name +
              ", " +
              dataOrder.district.name +
              ", " +
              dataOrder.city.name}
          </div>
        </div>
        <div className="flex items-start mt-2">
          <div className="font-semibold  w-1/4">Tạm tính:</div>
          <div className="font-bold text-red-500  w-3/4">
            {convertMoney(Data.totalPrice)}
          </div>
        </div>
        <div className="flex items-start mt-2">
          <div className="font-semibold w-1/4">Phí vận chuyển:</div>
          <div className="font-bold text-red-500 w-3/4">Miễn phí</div>
        </div>
      </div>
      <div className="mt-3 mb-3 border border-gray-200"></div>
      <div>
        <h2 className="font-medium text-2xl mb-2">Chọn hình thức thanh toán</h2>
        {type.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-2 cursor-pointer w-fit mb-2"
            htmlFor={item.typeName}
          >
            <input
              id={item.typeName}
              type="radio"
              checked={typePayment === item.id}
              onChange={() => setTypePayment(item.id)}
            />
            {item.icon}
            <span className="">{item.typeName}</span>
          </label>
        ))}
      </div>
      <div className="mt-3">
        <div className="flex justify-between">
          <p className="font-semibold text-lg">Tổng tiền:</p>
          <p className="text-red-500 font-bold text-xl">
            {convertMoney(Data.totalPrice)}
          </p>
        </div>
        <button
          //   onClick={handelOnClick}
          className="p-3 w-full mt-2 bg-red-600 rounded-sm text-white font-semibold"
        >
          THANH TOÁN NGAY
        </button>
      </div>
    </div>
  );
};

export default PaymentInfor;
