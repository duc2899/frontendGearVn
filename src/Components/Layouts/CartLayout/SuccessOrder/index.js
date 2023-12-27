import React, { useEffect, useRef, useState } from "react";
import successOrder from "../../StoreIcons/OrderSuccess.png";
import convertMoney from "../../../Utils/ConvertMoney";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import logoGearVN from "../../StoreIcons/LogoGearvn.png";
import "./fireWork.css";

function SuccessOrder() {
  const navigate = useNavigate();
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
    navigate("/");
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
            Vui lòng kiểm tra email shroudduc@gmail.com của bạn
          </p>
        </div>
        <div className="flex border items-center justify-center flex-col">
          <div className="p-2 w-full flex items-center justify-between">
            <p className=" font-semibold text-xl">Đơn hàng #123123</p>
            <p className=" font-normal text-sm">26/12/2023, 05:11 PM</p>
          </div>
          <div className="w-full border-b-1px border-t-1px">
            <div className="py-2 w-full px-4 flex items-center justify-between">
              <div className="flex items-center justify-start">
                <img
                  className="w-10 object-cover border rounded-md "
                  src="https://product.hstatic.net/200000722513/product/orico_pug_c6_200_1_4_b60355413edf4c5cb6dbe1f572623df8_391768b689b24af894ccba25416dea75.jpg"
                  alt="test"
                ></img>
                <p className="ml-2 font-medium">Cáp mạng ORICO 2 mét CAT6</p>
              </div>
              <p>x2</p>
              <p>{convertMoney(20000)}</p>
            </div>
          </div>
          <div className="w-full border-b-1px px-2 py-4 flex items-center justify-center flex-col">
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Tạm tính</p>
              <p>{convertMoney(200000)}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Phí vận chuyển </p>
              <p>{convertMoney(20000)}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Khuyến mãi</p>
              <p> -{convertMoney(2000)}</p>
            </div>
          </div>
          <div className="w-full px-2 py-4">
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Tổng cộng</p>
              <p className="font-semibold text-lg text-red-500">
                {convertMoney(200000)}
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
              <p className="">Bùi Quang đức</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Số điện thoại </p>
              <p className="">0965417187</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Email </p>
              <p className="">shroudduc@gmail.com</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Địa chỉ nhận hàng </p>
              <p className="">
                Số 1, Ngõ 233 Phạm Văn Đồng, Quận Bắc Từ Liêm, Thành phố Hà Nội
              </p>
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
              <p className="">Thanh toán khi giao hàng (COD)</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium">Thanh toán</p>
              <p className="">Chưa thanh toán</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 p-2">
        <div className="w-full flex items-center justify-center gap-4 ">
          <button
            onClick={handelToPrintf}
            className="p-2 rounded-md bg-gray-400 text-white hover:opacity-70 transition-all"
          >
            In
            <PrintIcon></PrintIcon>
          </button>
          <button
            onClick={handelGoToHome}
            className="p-2 rounded-md bg-blue-500 text-white hover:opacity-70 transition-all"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessOrder;
