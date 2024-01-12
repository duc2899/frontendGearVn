import React from "react";
import ram from "../StoreIcons/ramIcon.png";
import chip from "../StoreIcons/cpu.png";
import cardScreen from "../StoreIcons/graphics-card.png";
import ssd from "../StoreIcons/ssd.png";
import monitor from "../StoreIcons/monitor.png";
import { Link } from "react-router-dom";
import star from "../StoreIcons/star.png";
import convertMoney from "../../Utils/ConvertMoney";
import usb from "../StoreIcons/usb-drive.png";
import material from "../StoreIcons/material.png";
import expand from "../StoreIcons/full-screen.png";
import charge from "../StoreIcons/battery-status.png";
import mouseWire from "../StoreIcons/mouseWire.png";
import lightRgb from "../StoreIcons/light-rgb.png";
import CalculateStars from "../../Utils/CalculateStars";
const IconsMouse = [
  {
    name: "CHARGER",
    icon: charge,
  },
  {
    name: "CONNECTION",
    icon: mouseWire,
  },
  {
    name: "RGB",
    icon: lightRgb,
  },
];
const IconsKeyboard = [
  {
    name: "CONNECTION",
    icon: usb,
  },
  {
    name: "MATERIAL",
    icon: material,
  },
  {
    name: "EXPAND",
    icon: expand,
  },
];
const IconsLaptop = [
  {
    name: "CPU",
    icon: chip,
  },
  {
    name: "VGA",
    icon: cardScreen,
  },
  {
    name: "RAM",
    icon: ram,
  },
  {
    name: "SSD",
    icon: ssd,
  },
  {
    name: "SCREEN",
    icon: monitor,
  },
];

function ProductModules({ data, type }) {
  const storeIcons = [
    {
      type: "mouse",
      icons: IconsMouse,
    },
    {
      type: "laptop",
      icons: IconsLaptop,
    },
    {
      type: "keyboard",
      icons: IconsKeyboard,
    },
  ];
  const test = storeIcons.filter((item) => item.type === type);

  const filterData = data.properties.filter((item) => item.isPublic === true);
  const handelPriceSale = (oldPrice, rate) => {
    const percent = (100 - rate * 100) / 100;
    return oldPrice * percent;
  };

  return (
    <div className="p-2 w-52 border">
      <div>
        <Link to={`/details/laptop/${data.id}`} className="mb-3">
          <img
            src={data.image}
            alt="hêlo"
            className="w-52 h-52 object-cover hover:scale-115 overflow-hidden transition-all"
          />
        </Link>
        <Link
          to={`/details/laptop/${data.id}`}
          className="break-words font-semibold text-sm leading-3 hover:text-red-500 "
        >
          {data.title}
        </Link>
      </div>
      <div className="bg-gray-300 flex flex-wrap p-2 rounded-md gap-1">
        {filterData.map((laptop) =>
          test[0].icons.map(
            (icon) =>
              laptop.name === icon.name && (
                <div key={laptop.id} className="flex items-center gap-1">
                  <img
                    src={icon.icon}
                    alt="helo"
                    className="w-4 h-4 object-cover"
                  />
                  <p className="text-xs">{laptop.properties}</p>
                </div>
              )
          )
        )}
      </div>
      <div>
        <del>{convertMoney(data.oldPrice)}</del>
        <div>
          <span className="text-red-600 font-semibold mr-2">
            {convertMoney(handelPriceSale(data.oldPrice, data.saleRate))}
          </span>
          <span className="p-0.5 border border-red-600 text-red-600 bg-red-200 font-semibold rounded-md">
            - {data.saleRate * 100}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center">
          <p className="text-yellow-400">{CalculateStars(data.dataFeedback)}</p>
          <img src={star} alt="star" className="w-5 h-5 object-cover" />
        </div>
        <p>({data.dataFeedback.length} đánh giá)</p>
      </div>
    </div>
  );
}

export default ProductModules;
