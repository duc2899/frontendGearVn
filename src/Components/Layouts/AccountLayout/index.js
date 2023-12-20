import React, { useState } from "react";
import AccountInfo from "./AccountInfo";
import AddressNote from "./AddressNote";
import FavoriteProduct from "./FavoriteProduct";
import OrderManager from "./OrderManager";
import DetailOrder from "./OrderManager/DetailOrder";
const MENU_LOGIN = [
  {
    id: 0,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Thông tin tài khoản",
  },
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Sổ địa chỉ",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Quản lý đơn hàng",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
          clipRule="evenodd"
        />
      </svg>
    ),
    title: "Sản phẩm đã xem",
  },
];
const USER = {
  userName: "Bui Duc",
  email: "shroudduc@gmail.com",
  phoneNumber: "0965417187",
  addressNote: [
    {
      userName: "Bui Duc",
      phoneNumber: "0965417187",
      city: {
        name: "Hà Nội",
        code: 1,
      },
      districts: {
        name: "Quận Ba Đình",
        code: 1,
      },
      ward: {
        name: "Phường Phúc Xá",
        code: 1,
      },
      address: "so nha 1, ngach 12",
    },
    {
      userName: "Quang Duc",
      phoneNumber: "0965417187",
      city: {
        name: "Hà Nội",
        code: 1,
      },
      districts: {
        name: "Quận Ba Đình",
        code: 1,
      },
      ward: {
        name: "Phường Phúc Xá",
        code: 1,
      },
      address: "so nha 1, ngach 12",
    },
  ],
  cart: [],
  orders: [
    {
      id: 100805,
      createdAt: "10:23 Chủ Nhật, 18.06.2023",
      customer: "Bui duc - 0965417187",
      address:
        "Số nhà 1, Ngách 1 hẻm 8, ngõ 233 phạm văn đồng (Gần bộ công an), Dịch Vọng Hầu, Cầu Giấy, Hà Nội",
      paymentType: "Online",
      isPay: false,
      priceDelivery: 100000,
      items: [
        {
          title: "Laptop MSI Modern 14 C13M 607VN",
          image:
            "https://product.hstatic.net/200000722513/product/1698159670-h6-flow-hero-black_74bd8ecdf2f7432b8c2be64af995e4a4.png",
          oldPrice: 19390000,
          saleRate: 0.5,
          quantity: 1,
        },
        {
          title: "Màn hình Lenovo L24i-30 24 IPS 75Hz Freesync",
          image:
            "https://product.hstatic.net/200000722513/product/lenovo_l24i-30_gearvn_60089c92d77f46b0adada686a7cb68b6_c9948a3c6f974979943ed0e30c65bb69_grande.jpg",
          oldPrice: 4190000,
          saleRate: 0.38,
          quantity: 1,
        },
      ],
      totalPrice: 20000000,
      statusOrder: 4,
    },
    {
      id: 100509,
      createdAt: "10:23 Chủ Nhật, 18.06.2023",
      customer: "Bui duc - 0965417187",
      address:
        "Số nhà 1, Ngách 1 hẻm 8, ngõ 233 phạm văn đồng (Gần bộ công an), Dịch Vọng Hầu, Cầu Giấy, Hà Nội",
      paymentType: "Online",
      isPay: true,
      priceDelivery: 0,
      items: [
        {
          title: "Màn hình Lenovo L24i-30 24 IPS 75Hz Freesync",
          image:
            "https://product.hstatic.net/200000722513/product/lenovo_l24i-30_gearvn_60089c92d77f46b0adada686a7cb68b6_c9948a3c6f974979943ed0e30c65bb69_grande.jpg",
          oldPrice: 4190000,
          saleRate: 0.38,
          quantity: 3,
        },
      ],
      totalPrice: 20000000,
      statusOrder: 3,
    },
  ],
  favoriteProducts: [
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/1698159670-h6-flow-hero-black_74bd8ecdf2f7432b8c2be64af995e4a4.png",
      oldPrice: 19390000,
      saleRate: 0.5,
    },
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/20-236-988-01_7c79ecf51d3f4cee80a8cb4a081e6287.jpg",
      oldPrice: 19390000,
      saleRate: 0.5,
    },
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/1698159670-h6-flow-hero-black_74bd8ecdf2f7432b8c2be64af995e4a4.png",
      oldPrice: 19390000,
      saleRate: 0.5,
    },
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/20-236-988-01_7c79ecf51d3f4cee80a8cb4a081e6287.jpg",
      oldPrice: 19390000,
      saleRate: 0.5,
    },
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/1698159670-h6-flow-hero-black_74bd8ecdf2f7432b8c2be64af995e4a4.png",
      oldPrice: 19390000,
      saleRate: 0.5,
    },
    {
      title: "Laptop MSI Modern 14 C13M 607VN",
      image:
        "https://product.hstatic.net/200000722513/product/20-236-988-01_7c79ecf51d3f4cee80a8cb4a081e6287.jpg",
      oldPrice: 19390000,
      saleRate: 0.5,
    },
  ],
};
function AccountLayout(props) {
  const [tab, setTab] = useState(
    window.location.href.charAt(window.location.href.length - 1)
  );
  const [detailOrder, setDetailOrder] = useState(null);
  const MENU_OPTIONS = [
    <AccountInfo UserData={USER}></AccountInfo>,
    <AddressNote Data={USER}></AddressNote>,
    <OrderManager
      Data={USER}
      setTab={setTab}
      setDetailOrder={setDetailOrder}
    ></OrderManager>,
    <FavoriteProduct data={USER.favoriteProducts}></FavoriteProduct>,
    <DetailOrder detailOrder={detailOrder} setTab={setTab}></DetailOrder>,
  ];

  return (
    <div className="w-full bg-gray-200 min-h-5">
      <div className="mx-auto flex max-w-7xl gap-x-2 p-3 lg:px-8 max-sm:flex-col">
        <div className="bg-white rounded-md p-4 w-1/4 max-sm:w-full max-sm:mb-3">
          <div className="flex items-center border-b-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="font-semibold ml-2">Bui Duc</h2>
          </div>
          <div className="flex flex-col justify-center gap-y-3 mt-3">
            {MENU_LOGIN.map((item) => (
              <div
                className={`flex items-center justify-start gap-x-2 p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-red-500 ${
                  parseInt(tab) === item.id && "text-red-500"
                }`}
                key={item.id}
                onClick={() => setTab(item.id)}
              >
                {item.icon}
                <p className="font-medium text-base ">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        {MENU_OPTIONS[tab]}
      </div>
    </div>
  );
}

export default AccountLayout;
