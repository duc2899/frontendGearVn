import React, { useEffect, useState } from "react";
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
import { getDiscountCodeService } from "../../../Services/DiscountCodeServices/GetDiscountCodeService";
import { checkDiscountCodeService } from "../../../Services/DiscountCodeServices/CheckDiscountCodeService";
import { createBillService } from "../../../Services/BIllServices/CreateBillService";

const PaymentInfor = ({
  totalOrder,
  onChange,
  dataOrder,
  setDataBill,
  CartData,
  idUser,
}) => {
  const type = [
    {
      id: 0,
      typeName: "Thanh toán khi giao hàng (COD)",
      code: "COD",
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
      code: "ONLINE",
      icon: (
        <img
          style={{ width: `30px` }}
          src={paymentOnline}
          alt="paymentOnline"
        ></img>
      ),
    },
  ];
  const [loading, setLoading] = useState(false);
  const [discountCode, setDisCountCode] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [typePayment, setTypePayment] = useState("COD");
  const [errorCode, setErrorCode] = useState("");
  const [code, setCode] = useState("");
  const [applyDiscount, setApplyDiscount] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getDiscountCodeService();
      setDisCountCode(res.data);
    };
    fetchAPI();
  }, []);
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
          <li>{`- Giảm ${convertMoney(
            data.reduce_price
          )} cho giá trị đơn hàng`}</li>
          <li>{`- Mua tối thiểu ${convertMoney(data.condition_price)}`}</li>
        </ul>
      </div>
    );
  };
  const handelCheckCode = () => {
    if (code) {
      const fetchAPI = async () => {
        const res = await checkDiscountCodeService({
          price: totalOrder,
          code: code,
        });
        if (res.status === 200) {
          setApplyDiscount({
            value: res.data.reduce_price,
            code: res.data.code,
          });
          toast.success("Áp dụng mã khuyến mãi thành công");
          setCode("");
        } else {
          toast.error(res.message);
        }
      };
      fetchAPI();
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
        if (totalOrder < data.condition_price) {
          toast.error("Mã khuyến mãi không hợp lệ");
          return;
        }
        if (!compareDate(data.expiry)) {
          toast.error("Mã khuyến mãi không hợp lệ");
          return;
        }
        setApplyDiscount({
          value: data.reduce_price,
          code: data.code,
        });
        toast.success("Áp dụng mã khuyến mãi thành công");
      }
    } else {
      if (totalOrder < data.condition_price) {
        toast.error("Mã khuyến mãi không hợp lệ");
        return;
      }
      if (!compareDate(data.expiry)) {
        toast.error("Mã khuyến mãi không hợp lệ");

        return;
      }
      setApplyDiscount({
        value: data.reduce_price,
        code: data.code,
      });
      toast.success("Áp dụng mã khuyến mãi thành công");
    }
  };
  const finalPrice = (currentPrice) => {
    if (Object.keys(applyDiscount).length !== 0) {
      return currentPrice - applyDiscount.value + 100000;
    }
    return currentPrice + 100000;
  };
  const handelChangeStatus = async () => {
    setLoading(true);
    // const product =
    const products = [];
    CartData.map((cart) =>
      products.push({
        idUser: idUser,
        amount: cart.amount,
        id_product: cart.idProduct,
      })
    );
    const data = {
      sex: dataOrder.sex === "Anh" ? "MALE" : "FEMALE",
      address:
        dataOrder.homeAddress +
        ", " +
        dataOrder.ward.name +
        ", " +
        dataOrder.district.name +
        ", " +
        dataOrder.city.name,
      isPay: false,
      name: dataOrder.name,
      paymentType: typePayment,
      phoneNumber: dataOrder.phoneNumber,
      priceDelivery: 100000,
      idUser: idUser,
      discountCode: applyDiscount.code,
      products: products,
    };
    const res = await createBillService(data);
    if (res.status === 200) {
      setLoading(false);
      toast.success("Tạo bill thành công");
      setDataBill(res.data);
      onChange();
    } else {
      setLoading(false);
      toast.error("Lỗi không tạo được bill");
    }
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
            {dataOrder.homeAddress +
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
            {convertMoney(totalOrder)}
          </div>
        </div>
        <div className="flex items-start mt-2">
          <div className="font-semibold w-1/4">Phí vận chuyển:</div>
          <div className="font-bold text-red-500 w-3/4">
            {convertMoney(100000)}
          </div>
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
              checked={typePayment === item.code}
              onChange={() => setTypePayment(item.code)}
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
                    <span className="ml-1">
                      {convertMoney(code.reduce_price)}
                    </span>
                  </p>
                  <p>
                    Đơn hàng từ:
                    <span className="ml-1">
                      {convertMoney(code.condition_price)}
                    </span>
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
                      className="w-full"
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
            {convertMoney(finalPrice(totalOrder))}
          </p>
        </div>
        <button
          disabled={loading}
          onClick={handelChangeStatus}
          className="p-3 w-full mt-2 bg-red-600 rounded-sm text-white font-semibold hover:opacity-80 disabled:opacity-70 transition-opacity"
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-400 fill-gray-400 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            "THANH TOÁN NGAY"
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentInfor;
