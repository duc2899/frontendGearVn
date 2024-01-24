import React from "react";
import mark from "../Asset/mark.svg";
import faceBook from "../Asset/faceBook.svg";
import time from "../Asset/Time.svg";
import home from "../Asset/home.svg";
import { Carousel } from "antd";
import UtilitiesShowRoom from "../UtilitiesShowRoom";
function BodyShowRoom({ Data }) {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-center gap-5 bg-red-600 p-11">
        <img src={mark} alt="test" className="w-12"></img>
        <h2 className="font-bold text-white text-5xl">{Data.title}</h2>
      </div>
      {Data.showRooms.map((data, i) => (
        <div
          key={i}
          className="flex items-center justify-center gap-32 mt-10 lg:flex-row flex-col lg:mb-0 mb-24 "
        >
          <div className="lg:-mb-0 -mb-24">
            <h2 className="text-blue-950 font-bold">SHOWROOM GEARVN</h2>
            <h1 className="font-bold text-5xl text-blue-950 my-3">
              {data.name}
            </h1>
            <div className="bg-red-600 w-32 h-1"></div>
            <div className="my-3">
              <div className="flex items-end gap-3">
                <img src={home} alt="" className="w-6"></img>
                <p className="font-bold text-blue-950">{data.address}</p>
              </div>
              <div className="flex items-end gap-3 my-1">
                <img src={time} alt="" className="w-6"></img>
                <p className="font-bold text-blue-950">{data.timeWork}</p>
              </div>
              <div className="flex items-end gap-3">
                <img src={faceBook} alt="" className="w-6"></img>
                <p className="font-bold text-blue-950">{data.fanPage}</p>
              </div>
            </div>
            <div>
              <iframe
                src={data.linkIframe}
                width={500}
                height={350}
                style={{ border: "1px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="helo"
              ></iframe>
            </div>
          </div>
          <div className="relative" style={{ width: "40rem" }}>
            <img src={data.banner} alt="" className="absolute z-10"></img>
            <Carousel
              dotPosition="top"
              slidesToScroll={1}
              autoplay
              className="p-2"
            >
              {data.dataImage.map((image, i) => (
                <div key={i}>
                  <img src={image} alt="" className="rounded-md"></img>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      ))}
      <UtilitiesShowRoom></UtilitiesShowRoom>
    </div>
  );
}

export default BodyShowRoom;
