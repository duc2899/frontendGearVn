import React, { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext(null);
const AccountUserContext = ({ children }) => {
  const [userAccount, setUserAccount] = useState({
    userName: "Bui Duc",
    email: "shroudduc@gmail.com",
    phoneNumber: "0965417187",
    avatar:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    addressNotes: [
      {
        id: 1,
        userName: "Bui Duc",
        phoneNumber: "0965417187",
        city: {
          name: "Tỉnh Bắc Giang",
          code: 24,
        },
        district: {
          name: "Huyện Yên Thế",
          code: 215,
        },
        ward: {
          name: "Xã An Thượng",
          code: 7285,
        },
        address: "so nha 1, ngach 123312",
      },
      {
        id: 2,
        userName: "Quang Duc",
        phoneNumber: "0965417187",
        city: {
          name: "Hà Nội",
          code: 1,
        },
        district: {
          name: "Quận Ba Đình",
          code: 1,
        },
        ward: {
          name: "Phường Phúc Xá",
          code: 1,
        },
        address: "so nha 1, ngach 123",
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
  });
  const isLogin = false;
  const value = { userAccount, setUserAccount, isLogin };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default AccountUserContext;
