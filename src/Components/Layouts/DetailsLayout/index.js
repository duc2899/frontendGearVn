import { HomeOutlined } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import star from "../StoreIcons/star.png";
import BlockFeedback from "./BlockFeedback";
import BlockImagePreview from "./BlockImagePreview";
import CalculateStars from "../../Utils/CalculateStars";
import convertMoney from "../../Utils/ConvertMoney";
import priceSale from "../../Utils/ConvertPriceSale";
import ConvertStringToLowercase from "../../Utils/ConvertStringToLowercase";
const dataLaptop = {
  id: "123-dfefef-323232",
  title: "Laptop MSI Modern 14 C13M 607VN",
  image:
    "https://product.hstatic.net/200000722513/product/ook-14-oled-m1405ya-km047w-r5-7530u_2_1e7414e288ee45dcad153f77bb973bcb_982d7213abf74eeea6d8224c0e1de83d_grande.png",
  oldPrice: 19390000,
  saleRate: 0.5,
  quantity: 0,
  description:
    "Để duy trì mọi hoạt động và công suất làm việc từ các linh kiện một cách tốt nhất nhà Asus đã trang bị thêm hệ thống tản nhiệt trên laptop Asus Vivobook OLED. Công nghệ tản nhiệt Asus IceCool hiệu quả khi sử dụng 6 ống dẫn nhiệt và bộ quạt IceBlade 87 cánh được làm bằng Polymer tinh thể lỏng cao cấp.",
  properties: [
    {
      id: 1,
      properties: "i5-1245H",
      name: "CPU",
      isPublic: true,
    },
    {
      id: 2,
      properties: "RTX 2050",
      name: "VGA",
      isPublic: true,
    },
    {
      id: 3,
      properties: "8GB",
      name: "RAM",
      isPublic: true,
    },
    {
      id: 4,
      properties: "512GB",
      name: "SSD",
      isPublic: true,
    },
    {
      id: 5,
      properties: "15.6 inch FHD",
      name: "SCREEN",
      isPublic: true,
    },
    {
      id: 6,
      properties: "Cool Sliver",
      name: "COLOR",
      isPublic: false,
    },
    {
      id: 7,
      properties: "31.71 x 22.20 x 1.99 ~ 1.99 cm",
      name: "SIZE",
      isPublic: false,
    },
    {
      id: 8,
      properties: "Windows 11 Home",
      name: "OPERATINGSYSTEM",
      isPublic: false,
    },
    {
      id: 9,
      properties: "ASUS",
      name: "PRODUCER",
      isPublic: false,
    },
  ],
  previewImages: [
    {
      id: 0,
      url: "https://product.hstatic.net/200000722513/product/km047w_fe34ae67ecf844f094a5e716f73d8f42_grande.png",
      alt: "je",
    },
    {
      id: 1,
      url: "https://product.hstatic.net/200000722513/product/d-m1405ya-km047w-r5-7530u_1_6a63e1f6e8ad45afa3f785adc1929f81_1024x1024_b650b5f7853c42f78cd44686efb54acd_grande.png",
      alt: "je",
    },
    {
      id: 2,
      url: "https://product.hstatic.net/200000722513/product/ook-14-oled-m1405ya-km047w-r5-7530u_2_1e7414e288ee45dcad153f77bb973bcb_982d7213abf74eeea6d8224c0e1de83d_grande.png",
      alt: "je",
    },
    {
      id: 3,
      url: "https://product.hstatic.net/200000722513/product/ook-14-oled-m1405ya-km047w-r5-7530u_3_6753fcf024f64b978a482043d8aa5e50_b1132392ff214581a7e7cabf1dc3233e_grande.png",
      alt: "je",
    },
    {
      id: 4,
      url: "https://product.hstatic.net/200000722513/product/ook-14-oled-m1405ya-km047w-r5-7530u_4_8cb47bef90ff4e178593b40c5adda9a2_725f9c9a09ff42b48d9ebe5b4d156226_grande.png",
      alt: "je",
    },
  ],
  dataFeedback: [
    {
      name: "Ho Tho Hoan",
      createdAt: "2-7-2023",
      star: 4,
      message: "Đẹp",
    },
  ],
  stars: [
    {
      star: 5,
      count: 100,
    },
    {
      star: 4,
      count: 10,
    },
    {
      star: 3,
      count: 1,
    },
    {
      star: 2,
      count: 6,
    },
    {
      star: 1,
      count: 0,
    },
  ],
};

function DetailLayout(props) {
  const location = window.location.pathname.split("/");

  return (
    <div className="w-full bg-gray-300 pb-3">
      <div className="mx-auto flex max-w-7xl lg:px-8 flex-col">
        <div className="flex items-center justify-start gap-x-3 mt-2">
          <Link
            to="/"
            className="text-blue-500 flex items-center font-semibold"
          >
            <HomeOutlined></HomeOutlined>
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            to={`/collections/${location[2]}`}
            className="text-blue-500 font-semibold"
          >
            {location[2]}
          </Link>
          <span>/</span>
          <span className="lg:line-clamp-none line-clamp-1 lg:w-fit w-36">
            {dataLaptop.title}
          </span>
        </div>
        <div className="bg-white rounded-md mt-2 flex gap-x-3 lg:flex-row flex-col">
          <BlockImagePreview
            PrivewImages={dataLaptop.previewImages}
          ></BlockImagePreview>
          <div className="border-l-2 p-5 lg:w-8/12 w-full">
            <h2 className="text-2xl font-semibold">{dataLaptop.title}</h2>
            <div className="flex gap-x-3 items-center">
              <div className="flex items-center">
                <p className="text-yellow-500 font-semibold">
                  {CalculateStars(dataLaptop.stars)}
                </p>
                <img src={star} className="w-5 h-5" alt="star" />
              </div>
              <a className="text-blue-500 cursor-pointer " href="#comment">
                Xem đánh giá
              </a>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <p className="text-2xl font-semibold text-red-600 ">
                {convertMoney(
                  priceSale(dataLaptop.oldPrice, dataLaptop.saleRate)
                )}
              </p>
              <del className="text-sm">{convertMoney(dataLaptop.oldPrice)}</del>
              <p className="border border-red-500 p-1 bg-red-200 w-fit rounded-md text-red-600 text-sm">
                -{dataLaptop.saleRate * 100}%
              </p>
            </div>
            <div className="mt-2">
              <div>
                <button
                  disabled={!dataLaptop.quantity > 0}
                  className={`w-2/4 ${
                    dataLaptop.quantity > 0 ? "bg-red-600" : "bg-gray-400"
                  } rounded-md p-3 text-white text-lg font-semibold hover:opacity-90 transition-all`}
                >
                  {dataLaptop.quantity > 0 ? "MUA NGAY" : "HẾT HÀNG"}
                </button>
              </div>
            </div>
            <div className="mt-3">
              <h2 className="text-2xl font-semibold">Thống số kỹ thuật</h2>
              <table className="w-full mt-3">
                <tbody>
                  {dataLaptop.properties.map((pr) => (
                    <tr key={pr.id} className="border p-4">
                      <td className="p-2 border border-gray-500 bg-gray-200 font-semibold">
                        {ConvertStringToLowercase(pr.name)}
                      </td>
                      <td className="p-2">{pr.properties}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <h2 className="text-2xl font-semibold">Mô tả sản phẩm</h2>
              <div className="text-base break-words">
                {dataLaptop.description}
              </div>
            </div>
          </div>
        </div>
        {/* block fedback */}
        <BlockFeedback data={dataLaptop}></BlockFeedback>
      </div>
    </div>
  );
}

export default DetailLayout;
