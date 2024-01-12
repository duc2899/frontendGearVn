import React, { useState } from "react";
import convertMoney from "../../../Utils/ConvertMoney";
import paymentOnline from "../../StoreIcons/paymentOnlie.png";
import { Input, Popover } from "antd";
import paymentOffline from "../../StoreIcons/deliveryMan.png";
import discountImage from "../../StoreIcons/offer.png";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { message } from "antd";
const PaymentInfor = ({ Data, onChange, dataOrder, setDataOrder }) => {
  const discountCode = [
    {
      reduce: 100000,
      condition: 2500000,
      code: "DAILY100",
      expiry: "12/26/2023 14:44:19",
    },
    {
      reduce: 50000,
      condition: 1000000,
      code: "DAILY50",
      expiry: "12/21/2023 23:44:19",
    },
    {
      reduce: 20000,
      condition: 500000,
      code: "DAILY20",
      expiry: "12/20/2023 14:44:19",
    },
  ];
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

  const [messageApi, contextHolder] = message.useMessage();
  const [typePayment, setTypePayment] = useState(0);
  const [errorCode, setErrorCode] = useState("");
  const [code, setCode] = useState("");
  const [applyDiscount, setApplyDiscount] = useState({});
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Copied successfully",
    });
  };
  const handelCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    success();
  };
  const contentPopover = (data) => {
    return (
      <div>
        <div className="flex items-center">
          <div className="w-1/2">Mã</div>
          <div className="font-bold w-1/2 flex items-center gap-2">
            {data.code}
            <div
              className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center p-1 cursor-pointer hover:opacity-60 transition-all"
              onClick={() => handelCopyCode(data.code)}
            >
              <ContentCopyIcon className="ml-2 w-4 mr-2 text-blue-500"></ContentCopyIcon>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/2">Hạn sử dụng</div>
          <div className="w-1/2 font-medium">{data.expiry}</div>
        </div>
        <ul className="font-medium">
          <li>{`- Giảm ${convertMoney(data.reduce)} cho giá trị đơn hàng`}</li>
          <li>{`- Mua tối thiểu ${convertMoney(data.condition)}`}</li>
        </ul>
      </div>
    );
  };
  const handelCheckCode = () => {
    if (code) {
    } else {
      setErrorCode("Vui lòng nhập code");
    }
  };
  const handelApplyDiscountDaily = (data) => {
    function compareDate(date) {
      return new Date().getTime() <= new Date(date).getTime();
    }
    // check khi đã có mã
    if (Object.keys(applyDiscount).length !== 0) {
      if (applyDiscount.code !== data.code) {
        if (Data.totalPrice < data.condition) {
          toast.error("Mã khuyến mãi không hợp lệ");
          return;
        }
        if (!compareDate(data.expiry)) {
          toast.error("Mã khuyến mãi không hợp lệ");
          return;
        }
        setApplyDiscount({
          value: data.reduce,
          code: data.code,
        });
        toast.success("Áp dụng mã khuyến mãi thành công");
      }
    } else {
      if (Data.totalPrice < data.condition) {
        toast.error("Mã khuyến mãi không hợp lệ");
        return;
      }
      if (!compareDate(data.expiry)) {
        toast.error("Mã khuyến mãi không hợp lệ");

        return;
      }
      setApplyDiscount({
        value: data.reduce,
        code: data.code,
      });
      toast.success("Áp dụng mã khuyến mãi thành công");
    }
  };
  const finalPrice = (currentPrice) => {
    if (Object.keys(applyDiscount).length !== 0) {
      return currentPrice - applyDiscount.value;
    }
    return currentPrice;
  };
  const handelChangeStatus = () => {
    onChange();
  };
  return (
    <div className="p-2">
      {contextHolder}

      <div>
        <h2 className="font-medium text-2xl">Thông tin đặt hàng</h2>
        <div className="flex items-center mt-2">
          <div className="font-semibold  w-1/4">Giới tính:</div>
          <span className=" font-medium w-3/4">{dataOrder.sex}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="font-semibold  w-1/4">Khách hàng:</div>
          <span className="font-medium w-3/4">{dataOrder.name}</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="font-semibold  w-1/4">Số điện thoại:</div>
          <span className="font-medium w-3/4">{dataOrder.phoneNumber}</span>
        </div>
        <div className="flex items-start mt-2">
          <div className="font-semibold w-1/4">Địa chỉ nhận hàng:</div>
          <div className=" font-medium w-3/4">
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
        {dataOrder.note && (
          <div className="flex items-start mt-2">
            <div className="font-semibold w-1/4">Lưu ý: </div>
            <div className="font-medium w-3/4">{dataOrder.note}</div>
          </div>
        )}
      </div>
      <div className="mt-3 mb-3 border border-gray-200"></div>
      <div className="">
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
      <div className="mt-3 mb-3 border border-gray-200"></div>
      <div>
        <h2 className="font-medium text-2xl mb-2">Áp dụng mã giảm giá</h2>

        <div>
          <div className="flex items-center">
            <Input
              className="w-4/5 rounded-br-none rounded-tr-none"
              placeholder="Nhập mã giảm giá"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onFocus={() => setErrorCode("")}
            />
            <button
              onClick={handelCheckCode}
              className="bg-blue-500 w-1/5 hover:opacity-70 py-1 text-white rounded-md rounded-bl-none rounded-tl-none  transition-all"
            >
              Áp dụng
            </button>
          </div>
          {errorCode && (
            <p className="text-red-500 font-normal transition-all">
              {errorCode}
            </p>
          )}
        </div>

        {discountCode.map((code) => (
          <div
            key={code.code}
            className={`relative mt-3 p-2 border border-gray-300 rounded-md  before:contents-[''] before:w-3 before:h-2 before:absolute before:left-20 before:z-10 before:border before:border-gray-300 before:rounded-md before:border-t-0 before:rounded-t-none before:-top-px before:bg-white
         after:contents-[''] after:w-3 after:h-2 after:absolute after:left-20 after:z-10 after:border after:border-gray-300 after:rounded-md after:border-t-0 after:rounded-t-none after:-bottom-px after:rotate-180 after:bg-white ${
           applyDiscount.code === code.code && "bg-sky-100"
         }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="mr-10">
                <img
                  src={discountImage}
                  alt="DiscountImage"
                  className="w-20 object-cover"
                ></img>
              </div>
              <div className="flex justify-between w-full">
                <div className="text-sm font-medium">
                  <p>
                    Giảm
                    <span className="ml-1">{convertMoney(code.reduce)}</span>
                  </p>
                  <p>
                    Đơn hàng từ:
                    <span className="ml-1">{convertMoney(code.condition)}</span>
                  </p>
                  <p className="flex items-center">
                    Mã:
                    <span className="font-semibold text-blue-500 ml-2 flex items-center gap-2">
                      {code.code}
                      <div
                        className="bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center p-1 cursor-pointer hover:opacity-60 transition-all"
                        onClick={() => handelCopyCode(code.code)}
                      >
                        <ContentCopyIcon className="ml-2 w-4 mr-2 text-blue-500"></ContentCopyIcon>
                      </div>
                    </span>
                  </p>
                  <p>HSD: {code.expiry}</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                  <div className="w-full flex items-center justify-end">
                    <Popover
                      trigger={"hover"}
                      className="w-fit"
                      content={() => contentPopover(code)}
                    >
                      <ErrorOutlineIcon className="cursor-pointer" />
                    </Popover>
                  </div>
                  {applyDiscount.code === code.code ? (
                    <button
                      onClick={() => setApplyDiscount({})}
                      className="p-1 px-2 bg-blue-500 rounded-md text-white hover:opacity-60 transition-all"
                    >
                      Bỏ chọn
                    </button>
                  ) : (
                    <button
                      onClick={() => handelApplyDiscountDaily(code)}
                      className="p-1 w-fit px-2 bg-blue-500 rounded-md text-white hover:opacity-60 transition-all"
                    >
                      Áp dụng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        {Object.keys(applyDiscount).length !== 0 && (
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">
              Giảm giá:
              <div
                className="text-sm relative mt-3 bg-sky-100 py-2 px-3 pr-10 border border-blue-300 rounded-md  before:contents-[''] before:w-3 before:h-1.5 before:absolute before:-left-1 before:z-10 before:border before:border-blue-300 before:rounded-md before:border-t-0 before:rounded-t-none before:-translate-y-1/2 before:top-1/2 before:-rotate-90 before:bg-white
         after:contents-[''] after:w-3 after:h-1.5 after:absolute after:-right-1 after:z-10 after:border after:border-blue-300 after:rounded-md after:border-t-0 after:rounded-t-none after:-bottom-px after:rotate-90 after:bg-white after:top-1/2 after:-translate-y-1/2
        "
              >
                {applyDiscount.code}
                <HighlightOffIcon
                  className="absolute top-1/2 cursor-pointer text-gray-400 -translate-y-1/2 right-2"
                  onClick={() => setApplyDiscount({})}
                ></HighlightOffIcon>
              </div>
            </p>
            <p className="font-medium text-lg ">
              -{convertMoney(applyDiscount.value)}
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold text-lg">Tổng tiền:</p>
          <p className="text-red-500 font-bold text-xl">
            {convertMoney(finalPrice(Data.totalPrice))}
          </p>
        </div>
        <button
          onClick={handelChangeStatus}
          className="p-3 w-full mt-2 bg-red-600 rounded-sm text-white font-semibold"
        >
          THANH TOÁN NGAY
        </button>
      </div>
    </div>
  );
};

export default PaymentInfor;
