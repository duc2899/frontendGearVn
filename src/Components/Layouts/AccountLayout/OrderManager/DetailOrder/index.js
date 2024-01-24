import React, { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import cardUser from "../../../StoreIcons/cardUser.png";
import paymentMethod from "../../../StoreIcons/payment-method.png";
import productInfor from "../../../StoreIcons/productInfor.png";
import { Steps, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import convertMoney from "../../../../Utils/ConvertMoney";
import priceSale from "../../../../Utils/ConvertPriceSale";
import { cancelBillService } from "../../../../Services/BIllServices/CancelBillService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteOutlineRounded } from "@mui/icons-material";

function DetailOrder({ detailOrder, setTab }) {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);
    const res = await cancelBillService({ idBill: detailOrder.id });
    if (res.status === 200) {
      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
        toast.success("Hủy đơn hàng thành công");
        setTab(2);
      }, 2000);
    } else {
      setLoading(false);
      setIsModalOpen(false);
      toast.error("Hủy đơn hàng thất bại");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-md p-4 lg:w-3/4 w-full min-h-96">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">
          Chi tiết đơn hàng{" "}
          <span className="text-orange-500">#{detailOrder.id}</span>
          {detailOrder.isCancelOrder ? (
            <span className="text-red-500 ml-3">- Đơn hàng đã bị hủy</span>
          ) : (
            <span
              className={`${
                STATUS_ORDER[detailOrder.statusBill - 1].color
              } ml-3`}
            >
              - {STATUS_ORDER[detailOrder.statusBill - 1].name}
            </span>
          )}
        </h2>
        <p className="text-base font-medium">
          Đặt lúc: {detailOrder.createdDate}
        </p>
      </div>
      <div className="mt-8">
        <Steps
          current={detailOrder.statusBill - 1}
          labelPlacement="vertical"
          items={[
            {
              icon: <EventNoteIcon className="text-3xl" />,
              subTitle: (
                <p className="text-blue-500 font-medium">Đơn hàng đã đặt</p>
              ),
            },
            {
              icon: (
                <ManageAccountsIcon className="text-3xl"></ManageAccountsIcon>
              ),
              subTitle: (
                <p
                  className={`${
                    detailOrder.statusBill >= 2 && "text-blue-500 font-medium"
                  }`}
                >
                  Tiếp nhận và chờ xử lý
                </p>
              ),
            },
            {
              icon: <LocalShippingIcon className="text-3xl" />,
              subTitle: (
                <p
                  className={`${
                    detailOrder.statusBill >= 3 && "text-blue-500 font-medium"
                  }`}
                >
                  Đang giao hàng
                </p>
              ),
            },
            {
              icon: <HomeIcon className="text-3xl" />,
              subTitle: (
                <p
                  className={`${
                    detailOrder.statusBill >= 4 && "text-blue-500 font-medium"
                  }`}
                >
                  Đã giao hàng
                </p>
              ),
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
            <p className="w-3/4">{detailOrder.name}</p>
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
            <p className="w-1/4 ">
              {detailOrder.paymentType === "COD"
                ? "Thanh toán khi nhạn hàng (COD)"
                : "Thanh toán trực tuyến (ONLINE)"}
            </p>
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
          {detailOrder.products.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-around lg:flex-nowrap flex-wrap"
            >
              <img
                src={item.image}
                className="w-20 object-cover rounded-md"
                alt={item.name}
              />
              <p className="font-medium ">{item.name}</p>
              <p className="text-base">Số lượng: {item.amount}</p>
              <p className="text-red-500 font-medium">
                {convertMoney(priceSale(item.price, item.saleRate))}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center flex-col mt-4 text-base">
        <div className="flex items-center w-1/2">
          <p className="w-9/12 font-medium">Giá tạm tính:</p>
          <p className="w-12/12 font-medium">
            {convertMoney(detailOrder.temporaryPrice)}
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
          <p className="w-9/12 font-medium">Phí giảm giá</p>
          <p className="w-12/12 font-medium text-red-500">
            {"-" + convertMoney(detailOrder.discountPrice)}
          </p>
        </div>
        <div className="flex items-center w-1/2 text-lg">
          <p className="w-9/12 font-medium">Tổng tiền</p>
          <p className="w-12/12 font-medium text-red-500">
            {convertMoney(detailOrder.totalPrice)}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-3">
        {detailOrder.statusBill == 1 && !detailOrder.isCancelOrder && (
          <button
            onClick={() => showModal(true)}
            className="bg-red-500 rounded-md p-2 text-white hover:opacity-70 mr-3"
          >
            Hủy đơn hàng
          </button>
        )}
        <button
          onClick={() => setTab(2)}
          className="bg-blue-500 rounded-md p-2 text-white hover:opacity-70"
        >
          Quay lại
        </button>
      </div>
      <Modal
        title={
          <p className="flex items-center">
            <DeleteOutlineRounded className="text-red-400 w-10 h-10 bg-red-100 p-2 rounded-full mr-3" />
            Bạn có muốn hủy đơn hàng này?
          </p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <button
              disabled={loading}
              onClick={handleOk}
              className="bg-blue-500 rounded-md p-1 pl-2 pr-2 ml-3 text-white hover:opacity-70 disabled:opacity-60 transition-opacity"
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                "Ok"
              )}
            </button>
          </>
        )}
      ></Modal>
    </div>
  );
}

export default DetailOrder;
