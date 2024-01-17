import React from "react";
import pr1 from "../StoreImage/laptop.webp";
import pr2 from "../StoreImage/accessory.webp";
import pr3 from "../StoreImage/CASE.webp";
import pr4 from "../StoreImage/chair.webp";
import pr5 from "../StoreImage/CPU.webp";
import pr6 from "../StoreImage/HDD.webp";
import pr7 from "../StoreImage/headphone.webp";
import pr8 from "../StoreImage/KeyBoard.webp";
import pr9 from "../StoreImage/mainBoard.webp";
import pr10 from "../StoreImage/monitor.webp";
import pr11 from "../StoreImage/monitorApple.webp";
import pr12 from "../StoreImage/pc.webp";
import pr13 from "../StoreImage/RAM.webp";
import pr14 from "../StoreImage/VGA.webp";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ProductPortfolio(props) {
  const dataProduct = [
    {
      image: pr1,
      title: "Laptop",
    },
    {
      image: pr2,
      title: "Phụ kiện",
    },
    {
      image: pr3,
      title: "Case",
    },
    {
      image: pr4,
      title: "Ghế",
    },
    {
      image: pr5,
      title: "CPU",
    },
    {
      image: pr6,
      title: "Ổ cứng",
    },
    {
      image: pr7,
      title: "Tai nghe",
    },
    {
      image: pr8,
      title: "Bàn phím",
    },
    {
      image: pr9,
      title: "Main board",
    },
    {
      image: pr10,
      title: "Màn hình",
    },
    {
      image: pr11,
      title: "Apple",
    },
    {
      image: pr12,
      title: "PC",
    },
    {
      image: pr13,
      title: "RAM",
    },
    {
      image: pr14,
      title: "VGA",
    },
  ];
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
      <h1 className="text-3xl font-semibold mb-2">Danh mục sản phẩm</h1>

      <div className="p-3">
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
          removeArrowOnDeviceType={["tablet", "mobile, 'desktop"]}
          dotListClass="custom-dot-list-style"
          arrows={false}
          //   className="w-auto"
          itemClass="w-72"
          rewindWithAnimation={true}
          rewind={true}
        >
          {dataProduct.map((data, index) => (
            <div className="flex items-center justify-center flex-col">
              <img
                className="w-28 h-28 object-cover"
                key={index}
                src={data.image}
                alt={"jfawe"}
              />
              <p className="text-center mt-2 font-medium">{data.title}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ProductPortfolio;
