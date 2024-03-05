import React, { useEffect, useRef, useState } from "react";
import successOrder from "../../StoreIcons/OrderSuccess.png";
import convertMoney from "../../../Utils/ConvertMoney";
import priceSale from "../../../Utils/ConvertPriceSale";
import { useReactToPrint } from "react-to-print";
import logoGearVN from "../../StoreIcons/LogoGearvn.png";
import "./fireWork.css";

function SuccessOrder({ dataBill }) {
  const [fireWork, setShowFireWork] = useState(true);
  useEffect(() => {
    const timeShowFireWork = setTimeout(() => {
      setShowFireWork(false);
    }, 5000);
    return () => clearTimeout(timeShowFireWork);
  }, []);
  const PDFRef = useRef();
  const handelToPrintf = useReactToPrint({
    documentTitle: "Bill Order GEARVN",
    content: () => PDFRef.current,
  });
  const handelGoToHome = () => {
    window.location.href = window.location.origin;
  };
  return (
    <div className="p-2">
      {fireWork && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}

      <div className="w-full p-3" ref={PDFRef}>
        <div className="w-full flex items-center justify-center mb-3">
          <img
            src={logoGearVN}
            className="w-52 object-cover"
            alt="logogearvn"
          ></img>
        </div>
        <div className="w-full flex items-center justify-center flex-col mb-3">
          <img
            className="w-24 object-cover"
            src={successOrder}
            alt="successOrderIcon"
          ></img>
          <p className="font-medium text-xl font-sans">Cảm ơn bạn</p>
          <p className="font-medium text-xl font-sans">
            Đơn hàng của bạn đã được đặt thành công
          </p>
          <p className="italic text-gray-400">
            Vui lòng kiểm tra email {dataBill.email} của bạn
          </p>
        </div>
        <div className="flex border items-center justify-center flex-col">
          <div className="p-2 w-full flex items-center justify-between">
            <p className=" font-semibold text-xl">Mã Đơn hàng #{dataBill.id}</p>
            <p className=" font-normal text-sm">{dataBill.createdDate}</p>
          </div>
          <div className="w-full border-b-1px border-t-1px">
            {dataBill.products.map((pro) => (
              <div
                className="py-2 w-full px-4 flex items-center justify-between"
                key={pro.id}
              >
                <div className="flex items-center justify-start">
                  <img
                    className="w-10 object-cover border rounded-md "
                    src={pro.image}
                    alt="test"
                  ></img>
                  <p className="ml-2 font-medium">{pro.name}</p>
                </div>
                <p className="mx-2 font-medium c">x{pro.amount}</p>
                <p clas>{convertMoney(priceSale(pro.price, pro.saleRate))}</p>
              </div>
            ))}
          </div>
          <div className="w-full border-b-1px px-2 py-4 flex items-center justify-center flex-col">
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Tạm tính</p>
              <p>{convertMoney(dataBill.temporaryPrice)}</p>
            </div>
            {dataBill.priceDelivery && (
              <div className="flex items-center justify-between w-full">
                <p className="font-medium">Phí vận chuyển </p>
                <p>+{convertMoney(dataBill.priceDelivery)}</p>
              </div>
            )}

            {dataBill.discountPrice > 0 && (
              <div className="flex items-center justify-between w-full">
                <p className="font-medium">Khuyến mãi</p>
                <p> -{convertMoney(dataBill.discountPrice)}</p>
              </div>
            )}
          </div>
          {dataBill.note && (
            <div className="w-full border-b-1px px-2 py-4 flex items-center justify-center flex-col">
              <div className="flex items-center justify-between w-full">
                <p className="font-medium">Lưu ý</p>
                <p>{convertMoney(dataBill.note)}</p>
              </div>
            </div>
          )}
          <div className="w-full px-2 py-4">
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Tổng cộng</p>
              <p className="font-semibold text-lg text-red-500">
                {convertMoney(dataBill.totalPrice)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 border p-2">
          <div className="w-full">
            <p className="w-full font-semibold text-xl mb-2">
              Thông tin khách hàng
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Khách hàng </p>
              <p className="">{dataBill.name}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Giới tính</p>
              <p className="">{dataBill.sex === "FEMALE" ? "Chị" : "Anh"}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Số điện thoại </p>
              <p className="">{dataBill.phoneNumber}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Email </p>
              <p className="">{dataBill.email}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Địa chỉ nhận hàng </p>
              <p className="">{dataBill.address}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 border p-2">
          <div className="w-full">
            <p className="w-full font-semibold text-xl mb-2">
              Phương thức thanh toán
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Phương thức thanh toán</p>
              <p className="">
                {dataBill.paymentType === "COD"
                  ? "Thanh toán khi nhận hàng (COD)"
                  : "Thanh toán trực tuyến (ONLINE)"}
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Thanh toán</p>
              <p className="">
                {dataBill.isPay ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 p-2">
        <div className="w-full flex items-center justify-center gap-4 ">
          <button
            onClick={handelToPrintf}
            className="p-2 rounded-md bg-gray-400 font-medium text-white hover:opacity-70 transition-all w-36"
          >
            In
          </button>
          <button
            onClick={handelGoToHome}
            className="p-2 rounded-md bg-blue-500 text-white hover:opacity-70 transition-all w-40"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessOrder;
