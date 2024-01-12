import React, { useRef } from "react";

function DetailSideBar({ id, setSideBar }) {
  const modalRef = useRef();
  document.onclick = (e) => {
    if (modalRef.current !== e.target) {
      setSideBar("");
      return;
    }
  };
  return (
    <div
      ref={modalRef}
      onMouseLeave={() => setSideBar("")}
      className="flex w-1/2 p-2 animate__animated animate__fadeIn rounded-md absolute left-80 top-20 bg-white h-1/2 z-10"
    >
      <div className="w-1/3">
        <p className="font-bold text-red-500 ">Thương hiệu</p>
        <div className="flex items-start flex-col justify-center ">
          <a href="/" className="text-sm font-medium hover:text-red-500">
            ASUS
          </a>
          <a href="/" className="text-sm font-medium hover:text-red-500">
            ASUS
          </a>
          <a href="/" className="text-sm font-medium hover:text-red-500">
            ASUS
          </a>{" "}
          <a href="/" className="text-sm font-medium hover:text-red-500">
            ASUS
          </a>
          <a href="/" className="text-sm font-medium hover:text-red-500">
            ASUS
          </a>
        </div>
      </div>
      <div className="w-1/3 ">
        <p className="font-bold text-red-500 ">Giá bán</p>
        <div className="flex items-start flex-col justify-center ">
          <a href="/" className="text-sm font-medium hover:text-red-500">
            Dưới 15 triệu
          </a>
          <a href="/" className="text-sm font-medium hover:text-red-500">
            Từ 15-20 triệu
          </a>
          <a href="/" className="text-sm font-medium hover:text-red-500">
            Trên 20 triệu
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetailSideBar;
