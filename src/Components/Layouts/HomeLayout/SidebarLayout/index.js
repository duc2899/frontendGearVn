import React, { useState } from "react";
import LaptopChromebookRoundedIcon from "@mui/icons-material/LaptopChromebookRounded";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import MouseRoundedIcon from "@mui/icons-material/MouseRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Link } from "react-router-dom";
const MENU = [
  {
    title: "Laptop",
    icon: <LaptopChromebookRoundedIcon></LaptopChromebookRoundedIcon>,
    href: "collections/laptop",
  },
  {
    title: "Bàn phím",
    icon: <KeyboardRoundedIcon></KeyboardRoundedIcon>,
    href: "collections/keyboard",
  },
  {
    title: "Chuột",
    icon: <MouseRoundedIcon></MouseRoundedIcon>,
    href: "collections/mouse",
  },
];
function SideBar({ setSideBar }) {
  return (
    <div className="bg-white p-2 rounded-md sm: w-full relative h-full xl:block flex">
      {MENU.map((item, index) => (
        <Link
          to={item.href}
          key={index}
          // onMouseEnter={() => handelOpenSideBarDetail(index)}
          className="flex p-2 justify-between items-center cursor-pointer mt-3 hover:bg-red-600 hover:text-white relative hover:before:absolute hover:before:content-[''] hover:before:-right-10 hover:before:top-0 hover:before:border-t-transparent hover:before:border-t-25px hover:before:border-b-transparent hover:before:border-b-24px hover:before:border-r-transparent hover:before:border-r-25px hover:before:border-l-red-600 hover:before:border-l-25px hover:before:z-50"
        >
          <div className="flex items-center">
            {item.icon}
            <p className="ml-2">{item.title}</p>
          </div>
          <KeyboardArrowRightRoundedIcon></KeyboardArrowRightRoundedIcon>
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
