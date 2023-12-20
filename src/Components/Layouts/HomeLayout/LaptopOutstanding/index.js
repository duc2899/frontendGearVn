import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductModules from "../../Modules/ProductModules";

const LaptopData = [
  {
    id: "fajfeaf-jakwefawe",
    type: "laptop",
    title: "Laptop MSI Modern 14 C13M 607VN",
    image:
      "https://product.hstatic.net/200000722513/product/0f3354e7796c334af561994c7_large_ac9334905a3b4354b5a27555f4510780_large_19db3dd766fa42f1983f345b05bf6887_medium.png",
    oldPrice: 19390000,
    saleRate: 0.5,
    quantity: 13,
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

function LaptopOutstanding(props) {
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
    <div className="bg-white mt-3 p-2">
      <h1 className="text-3xl font-semibold mb-2">Laptop bán chạy</h1>
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
        >
          {LaptopData.map((data, index) => (
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

export default LaptopOutstanding;
