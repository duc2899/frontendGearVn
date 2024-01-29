import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductModules from "../../Modules/ProductModules";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { getAllProduct } from "../../../Services/ProductsServices/GetAllProductService";
import { useNavigate } from "react-router-dom";
const MouseData = [
  {
    id: "awefawe-123123dwdw",
    type: "keyboard",
    title: "Bàn phím cơ AKKO 3108 v2 DS Horizon Akko Switch V3 Cream Blue",
    image:
      "https://product.hstatic.net/200000722513/product/1_94e8754f691f44b19fbb2f94dcfa6ead_grande.jpg",
    oldPrice: 1090000,
    saleRate: 0.3,
    quantity: 3,
    properties: [
      {
        id: 1,
        properties: "100 – 25.400",
        name: "MATERIAL",
        isPublic: true,
      },
      {
        id: 2,
        properties: "440 x 140 x 40mm",
        name: "SIZE",
        isPublic: false,
      },
      {
        id: 3,
        properties: "Khong day",
        name: "CONNECTION",
        isPublic: true,
      },
      {
        id: 4,
        properties: "Cream Blue Akko switch v2",
        name: "SWITCH",
        isPublic: false,
      },
      {
        id: 5,
        properties: "Full size",
        name: "EXPAND",
        isPublic: true,
      },
      {
        id: 6,
        properties: "Akko",
        name: "PRODUCER",
        isPublic: false,
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
        count: 5,
      },
    ],
  },
];
function KeyboardCollections(props) {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="bg-white mt-3 p-6 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-semibold mb-2">Bàn phím bán chạy</h1>
        <p
          onClick={() => navigate("/collections/keyboard")}
          className="text-blue-500 hover:opacity-70 cursor-pointer"
        >
          Xem tất cả
        </p>
      </div>
      <div>
        <Carousel
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          slidesToSlide={1}
          autoPlay={false}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          //   className="w-auto"
          itemClass="w-72"
          rewind={true}
          customRightArrow={
            <ArrowCircleRightIcon className="text-4xl absolute right-0 cursor-pointer hover:opacity-60 transition-opacity"></ArrowCircleRightIcon>
          }
          customLeftArrow={
            <ArrowCircleLeftIcon className="text-4xl absolute left-0 cursor-pointer hover:opacity-60 transition-opacity"></ArrowCircleLeftIcon>
          }
        >
          {MouseData.map((data, index) => (
            <ProductModules
              key={index}
              data={data}
              type={data.type}
            ></ProductModules>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default KeyboardCollections;
