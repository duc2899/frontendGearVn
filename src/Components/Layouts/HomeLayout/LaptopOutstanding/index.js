import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductModules from "../../Modules/ProductModules";
import { getAllProduct } from "../../../Services/ProductsServices/GetAllProductService";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
function LaptopOutstanding(props) {
  const navigate = useNavigate();
  const [laptopData, setLaptopData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await getAllProduct("laptop", 0, 4);
        setLaptopData(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAPI();
  }, []);
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
        <h1 className="text-3xl font-semibold mb-2">Laptop bán chạy</h1>
        <p
          onClick={() => navigate("/collections/laptop")}
          className="text-blue-500 hover:opacity-70 cursor-pointer title"
        >
          Xem tất cả
        </p>
      </div>
      <div>
        <Carousel
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          slidesToSlide={1}
          autoPlay={false}
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
          {laptopData.map((data, index) => (
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
