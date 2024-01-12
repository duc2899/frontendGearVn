import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductModules from "../../Modules/ProductModules";
import * as getAllLaptopProductService from "../../../Services/ProductsServices/getAllLaptopProductService";

function LaptopOutstanding(props) {
  const [laptopData, setLaptopData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await getAllLaptopProductService.getAllLaptopProduct(0, 4);
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
