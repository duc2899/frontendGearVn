import React from "react";
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
function SideBar(props) {
  return (
    <div className="bg-white p-2 w-56 rounded-md basis-10 sm: w-full">
      {MENU.map((item, index) => (
        <Link key={index} to={item.href}>
          <div className="flex p-2 justify-between items-center cursor-pointer mt-3 hover:bg-red-600 hover:text-white">
            <div className="flex items-center">
              {item.icon}
              <p className="ml-2">{item.title}</p>
            </div>
            <KeyboardArrowRightRoundedIcon></KeyboardArrowRightRoundedIcon>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SideBar;
