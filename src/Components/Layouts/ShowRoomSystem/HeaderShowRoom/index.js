import React from "react";
import backGround from "../Asset/background.png";
import lagerHome from "../Asset/asset_2.png";
import smallHome from "../Asset/asset_1.png";
import rider from "../Asset/asset_e.png";
import pole from "../Asset/pole.png";
import northArea from "../Asset/northArea.png";
import southArea from "../Asset/southArea.png";
import "./showRoom.css";
function HeaderShowRoom({ setChoose }) {
  const handelClickToChoose = () => {
    window.scrollTo(0, 420);
  };
  return (
    <div className="bg-white">
      <div
        className="relative"
        style={{
          backgroundImage: `url(${backGround})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "55vh",
        }}
      >
        <div className="absolute top-7 left-40">
          <h2 className="font-bold text-5xl text-blue-950">
            HỆ THỐNG SHOWROOM GEARVN
          </h2>
          <p className="text-blue-900 font-semibold text-2xl mt-3">
            Địa điểm trải nghiệm và mua sắm thiết bị công nghệ cao cấp
          </p>
          <button
            onClick={handelClickToChoose}
            className="bg-red-500 p-2 px-9 rounded-md text-white font-bold mt-10 text-xl hover:opacity-90 transition-opacity"
          >
            XEM NGAY
          </button>
        </div>
        <div
          className="absolute bottom-0 home"
          style={{
            left: "920px",
            backgroundImage: `url(${pole})`,
            width: "1.75rem",
            height: "10rem",
          }}
        ></div>
        <div
          className="absolute bottom-0 h-80 w-80 home"
          style={{
            left: "1000px",
            backgroundImage: `url(${lagerHome})`,
          }}
        ></div>
        <div
          className="absolute bottom-0 h-60 w-60 home"
          style={{
            left: "650px",
            backgroundImage: `url(${smallHome})`,
          }}
        ></div>
        <div
          className="absolute bottom-0 h-32 w-36 animate__animated animate__fadeInLeft home"
          style={{
            left: "450px",
            backgroundImage: `url(${rider})`,
          }}
        ></div>
      </div>
      <div className="h-2 w-full bg-blue-950"></div>
      <div className="pb-10">
        <h2 className="font-bold text-3xl text-blue-950 text-center my-10">
          CHỌN KHU VỰC CỦA BẠN
        </h2>
        <div className="flex items-center justify-center gap-9">
          <div
            id="target"
            className="cursor-pointer relative"
            onClick={() => setChoose(2)}
          >
            <img
              src={northArea}
              alt=""
              className="w-72 border-2 rounded-md p-6 py-10 hover:border-red-400 transition-all"
            ></img>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-950 font-bold text-white p-3 w-48 rounded-md text-center">
              KHU VỰC MIỀN BÁC
            </p>
          </div>
          <div className="cursor-pointer relative" onClick={() => setChoose(1)}>
            <img
              src={southArea}
              alt=""
              className="w-72 border-2 rounded-md p-6 py-10 hover:border-red-400 transition-all"
            ></img>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-950 font-bold text-white p-3 w-48 rounded-md text-center">
              KHU VỰC MIỀN NAM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderShowRoom;
