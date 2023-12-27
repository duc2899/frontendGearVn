import React, { useContext, useState } from "react";
import { Steps } from "antd";
import "./cart.css";
import convertMoney from "../../Utils/ConvertMoney";
import CartInfor from "./CartInfor";
import OrderInfor from "./OrderInfor";
import PaymentInfor from "./PaymentInfor";
import SuccessOrder from "./SuccessOrder";
import { ArrowBack } from "@mui/icons-material";
import { UserContext } from "../../Context/AccountUser";
import ModalLogin from "../DefaultLayout/Modal/ModalLogin";
import ModalRegister from "../DefaultLayout/Modal/ModalRegister";
import { Empty } from "antd";
const Data = {
  items: [
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/1698159670-h6-flow-hero-black_74bd8ecdf2f7432b8c2be64af995e4a4.png",
      oldPrice: 19390000,
      saleRate: 0.5,
      quantity: 2,
    },
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/20-236-988-01_7c79ecf51d3f4cee80a8cb4a081e6287.jpg",
      oldPrice: 19390000,
      saleRate: 0.5,
      quantity: 2,
    },
  ],
  totalPrice: 3000000,
};

function CartLayout(props) {
  const { userAccount } = useContext(UserContext);
  const isLogin = Object.entries(userAccount).length !== 0;
  const [dataOrder, setDataOrder] = useState({});
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const onChange = () => {
    if (progress < 4 && isLogin) {
      setProgress(progress + 1);
    } else {
      setOpenModalLogin(true);
    }
  };
  const onChangePrev = () => {
    if (progress < 3) {
      setProgress(progress - 1);
    }
  };
  const [progress, setProgress] = useState(0);
  const views = [
    <CartInfor Data={Data} onChange={onChange}></CartInfor>,
    <OrderInfor
      Data={Data}
      onChange={onChange}
      dataOrder={dataOrder}
      addressNote={userAccount.addressNotes}
      setDataOrder={setDataOrder}
    ></OrderInfor>,
    <PaymentInfor
      Data={Data}
      dataOrder={dataOrder}
      setDataOrder={setDataOrder}
      onChange={onChange}
    ></PaymentInfor>,
    <SuccessOrder></SuccessOrder>,
  ];
  const onChangeStep = (value) => {
    if (value < progress && progress !== 3) {
      setProgress(value);
    }
  };
  return (
    <div className="w-full bg-gray-200 flex justify-center items-center flex-col">
      <div className="my-3 lg:w1/2">
        <a href="/" className="flex items-center text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Mua thêm sản phẩm khác
        </a>
      </div>
      <div className=" bg-white rounded-sm p-2 mb-5 lg:w-1/2 w-full">
        <div className=" bg-orange-100/50 p-2 flex flex-col justify-between items-center rounded-sm">
          <div>
            <Steps
              labelPlacement={"vertical"}
              current={progress}
              onChange={onChangeStep}
              items={[
                {
                  title: (
                    <p
                      className={`font-semibold  ${
                        progress >= 0 ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      Giỏ hàng
                    </p>
                  ),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 ${
                        progress >= 0 ? "text-red-500" : "text-gray-600"
                      } mt-1`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
                {
                  title: (
                    <p
                      className={`font-semibold  ${
                        progress >= 1 ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      Thông tin đặt hàng
                    </p>
                  ),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 ${
                        progress >= 1 ? "text-red-500" : "text-gray-600"
                      } mt-1`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
                {
                  title: (
                    <p
                      className={`font-semibold  ${
                        progress >= 2 ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      Thanh toán
                    </p>
                  ),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 ${
                        progress >= 2 ? "text-red-500" : "text-gray-600"
                      } mt-1`}
                    >
                      <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                      <path
                        fillRule="evenodd"
                        d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
                {
                  title: (
                    <p
                      className={`font-semibold  ${
                        progress >= 3 ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      Hoàn tất
                    </p>
                  ),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-6 h-6 ${
                        progress >= 3 ? "text-red-500" : "text-gray-600"
                      } mt-1`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
              ]}
            ></Steps>
          </div>
        </div>
        {Data.items.length > 0 ? (
          views[progress]
        ) : (
          <div className="flex flex-col items-center gap-5 mt-3">
            <Empty></Empty>
            <a href="/" className="bg-blue-500 p-2 rounded-md text-white">
              Tiếp tục mua hàng
            </a>
          </div>
        )}
        {progress > 0 && progress < 3 && (
          <div className="flex items-center mt-2">
            <ArrowBack fontSize="small" sx={{ color: "blue" }}></ArrowBack>
            <button
              className="text-blue-500 font-medium"
              onClick={onChangePrev}
            >
              Trở về
            </button>
          </div>
        )}
        <ModalLogin
          open={openModalLogin}
          setOpen={setOpenModalLogin}
          setRegister={setOpenModalRegister}
        ></ModalLogin>
        <ModalRegister
          open={openModalRegister}
          setOpen={setOpenModalRegister}
          setLogin={setOpenModalLogin}
        ></ModalRegister>
      </div>
    </div>
  );
}

export default CartLayout;
