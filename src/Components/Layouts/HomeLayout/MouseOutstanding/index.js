import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductModules from "../../Modules/ProductModules";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate } from "react-router-dom";
const MouseData = [
  {
    id: "awefawe-123123dwdw",
    type: "mouse",
    title: "Chuột HP HYPERX Pulsefire Haste Black II",
    image:
      "https://product.hstatic.net/200000722513/product/b8a10-95ac-4e6d-9e50-2808c2959505__1__15430e9a7a954cd9a4427309477cb0df_e869da53af56496c9c74617366a28e2b_medium.png",
    oldPrice: 1090000,
    saleRate: 0.3,
    quantity: 3,
    properties: [
      {
        id: 1,
        properties: "100 – 25.400",
        name: "DPI",
        isPublic: false,
      },
      {
        id: 2,
        properties: "125,0 x 63,5 x 40,0 mm",
        name: "SIZE",
        isPublic: false,
      },
      {
        id: 3,
        properties: "Co day",
        name: "CONNECTION",
        isPublic: true,
      },
      {
        id: 4,
        properties: "Co RGB",
        name: "RGB",
        isPublic: true,
      },
      {
        id: 5,
        properties: "Co",
        name: "CHARGER",
        isPublic: true,
      },
      {
        id: 6,
        properties: "Black",
        name: "COLOR",
        isPublic: false,
      },
      {
        id: 7,
        properties: "Logitech",
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
  {
    id: "awefawe-123123dwfefew",
    type: "mouse",
    title: "Chuột HP HYPERX Pulsefire Haste Black II",
    image:
      "https://product.hstatic.net/200000722513/product/b8a10-95ac-4e6d-9e50-2808c2959505__1__15430e9a7a954cd9a4427309477cb0df_e869da53af56496c9c74617366a28e2b_medium.png",
    oldPrice: 1090000,
    saleRate: 0.3,
    quantity: 3,
    properties: [
      {
        id: 1,
        properties: "100 – 25.400",
        name: "DPI",
        isPublic: false,
      },
      {
        id: 2,
        properties: "125,0 x 63,5 x 40,0 mm",
        name: "SIZE",
        isPublic: false,
      },
      {
        id: 3,
        properties: "Co day",
        name: "CONNECTION",
        isPublic: true,
      },
      {
        id: 4,
        properties: "Co RGB",
        name: "RGB",
        isPublic: true,
      },
      {
        id: 5,
        properties: "Co",
        name: "CHARGER",
        isPublic: true,
      },
      {
        id: 6,
        properties: "Black",
        name: "COLOR",
        isPublic: false,
      },
      {
        id: 7,
        properties: "Logitech",
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
  {
    id: "awefawe-123123dwdvvsdvw",
    type: "mouse",
    title: "Chuột HP HYPERX Pulsefire Haste Black II",
    image:
      "https://product.hstatic.net/200000722513/product/b8a10-95ac-4e6d-9e50-2808c2959505__1__15430e9a7a954cd9a4427309477cb0df_e869da53af56496c9c74617366a28e2b_medium.png",
    oldPrice: 1090000,
    saleRate: 0.3,
    quantity: 3,
    properties: [
      {
        id: 1,
        properties: "100 – 25.400",
        name: "DPI",
        isPublic: false,
      },
      {
        id: 2,
        properties: "125,0 x 63,5 x 40,0 mm",
        name: "SIZE",
        isPublic: false,
      },
      {
        id: 3,
        properties: "Co day",
        name: "CONNECTION",
        isPublic: true,
      },
      {
        id: 4,
        properties: "Co RGB",
        name: "RGB",
        isPublic: true,
      },
      {
        id: 5,
        properties: "Co",
        name: "CHARGER",
        isPublic: true,
      },
      {
        id: 6,
        properties: "Black",
        name: "COLOR",
        isPublic: false,
      },
      {
        id: 7,
        properties: "Logitech",
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
  {
    id: "awefawe-123czscsc123dwdw",
    type: "mouse",
    title: "Chuột HP HYPERX Pulsefire Haste Black II",
    image:
      "https://product.hstatic.net/200000722513/product/b8a10-95ac-4e6d-9e50-2808c2959505__1__15430e9a7a954cd9a4427309477cb0df_e869da53af56496c9c74617366a28e2b_medium.png",
    oldPrice: 1090000,
    saleRate: 0.3,
    quantity: 3,
    properties: [
      {
        id: 1,
        properties: "100 – 25.400",
        name: "DPI",
        isPublic: false,
      },
      {
        id: 2,
        properties: "125,0 x 63,5 x 40,0 mm",
        name: "SIZE",
        isPublic: false,
      },
      {
        id: 3,
        properties: "Co day",
        name: "CONNECTION",
        isPublic: true,
      },
      {
        id: 4,
        properties: "Co RGB",
        name: "RGB",
        isPublic: true,
      },
      {
        id: 5,
        properties: "Co",
        name: "CHARGER",
        isPublic: true,
      },
      {
        id: 6,
        properties: "Black",
        name: "COLOR",
        isPublic: false,
      },
      {
        id: 7,
        properties: "Logitech",
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
  {
    id: "awefawe-123123dbfbfwdw",
    type: "mouse",
    title: "Chuột HP HYPERX Pulsefire Haste Black II",
    image:
      "https://product.hstatic.net/200000722513/product/b8a10-95ac-4e6d-9e50-2808c2959505__1__15430e9a7a954cd9a4427309477cb0df_e869da53af56496c9c74617366a28e2b_medium.png",
    oldPrice: 1090000,
    saleRate: 0.3,
    quantity: 3,
    properties: [
      {
        id: 1,
        properties: "100 – 25.400",
        name: "DPI",
        isPublic: false,
      },
      {
        id: 2,
        properties: "125,0 x 63,5 x 40,0 mm",
        name: "SIZE",
        isPublic: false,
      },
      {
        id: 3,
        properties: "Co day",
        name: "CONNECTION",
        isPublic: true,
      },
      {
        id: 4,
        properties: "Co RGB",
        name: "RGB",
        isPublic: true,
      },
      {
        id: 5,
        properties: "Co",
        name: "CHARGER",
        isPublic: true,
      },
      {
        id: 6,
        properties: "Black",
        name: "COLOR",
        isPublic: false,
      },
      {
        id: 7,
        properties: "Logitech",
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
function MouseCollections(props) {
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
        <h1 className="text-3xl font-semibold mb-2">Chuột bán chạy</h1>
        <p
          onClick={() => navigate("/collections/mouse")}
          className="text-blue-500 hover:opacity-70 cursor-pointer"
        >
          Xem tất cả
        </p>
      </div>
      <div>
        <Carousel
          responsive={responsive}
          infinite={true}
          slidesToSlide={1}
          autoPlay={true}
          autoPlaySpeed={2000}
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

export default MouseCollections;
