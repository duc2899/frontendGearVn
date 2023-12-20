import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import { Dropdown, Popover } from "antd";
import convertMoney from "../../Utils/ConvertMoney";
import MultiRangeSlider from "multi-range-slider-react";
import ProductModules from "../Modules/ProductModules";
function CollectionModules() {
  const mouseData = [
    {
      id: "awefawe-123123dwdw",
      title: "Chuột HP HYPERX Pulsefire Haste Black II",
      type: "mouse",
      image:
        "https://product.hstatic.net/200000722513/product/b8a10-95ac-4e6d-9e50-2808c2959505__1__15430e9a7a954cd9a4427309477cb0df_e869da53af56496c9c74617366a28e2b_medium.png",
      oldPrice: 1090000,
      saleRate: 0.3,
      quantity: 3,
      properties: [
        {
          id: 1,
          properties: "100 – 25.400",
          name: "DPI",
          isPublic: false,
        },
        {
          id: 2,
          properties: "125,0 x 63,5 x 40,0 mm",
          name: "SIZE",
          isPublic: false,
        },
        {
          id: 3,
          properties: "Co day",
          name: "CONNECTION",
          isPublic: true,
        },
        {
          id: 4,
          properties: "Co",
          name: "RGB",
          isPublic: true,
        },
        {
          id: 5,
          properties: "Co",
          name: "CHARGER",
          isPublic: true,
        },
        {
          id: 6,
          properties: "Black",
          name: "COLOR",
          isPublic: false,
        },
        {
          id: 7,
          properties: "Logitech",
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
  const LaptopData = [
    {
      id: "awefawe-123123",
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
    {
      id: "awefawe-123awd123",
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
    {
      id: "awefawe-1adwd23123",
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
    {
      id: "awefawe-123123adwdw",
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
    {
      id: "awadwdefawe-123123",
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
    {
      id: "awadwdefawdwawe-123123",
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

  const [res, setRes] = useState([]);
  const location = window.location.pathname.split("/");

  useEffect(() => {
    if (location[location.length - 1] === "laptop") {
      return setRes(LaptopData);
    } else if (location[location.length - 1] === "mouse") {
      return setRes(mouseData);
    } else if (location[location.length - 1] === "keyboard") {
    } else {
      console.log("12");
    }
  }, [location[location.length - 1]]);

  const Modules = ({ data }) => {
    if (location[location.length - 1] === "laptop") {
      return <ProductModules data={data} type={data.type}></ProductModules>;
    } else if (location[location.length - 1] === "mouse") {
      return <ProductModules data={data} type={data.type}></ProductModules>;
    } else if (location[location.length - 1] === "keyboard") {
      return <ProductModules></ProductModules>;
    } else {
      console.log("12");
    }
  };

  const filterLaptop = res[0]?.properties.filter(
    (item) => item.isPublic === true
  );
  const arr = [];
  const arrTitle = [];
  const arrItem = [];

  const [open, setOpen] = useState(1);
  const [minValue, set_minValue] = useState(1000000);
  const [maxValue, set_maxValue] = useState(9000000);

  const [openPrice, setOpenPrice] = useState(false);
  const [filter, setFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState(0);

  const [filterArr, setFilterArr] = useState([]);
  const items = [
    {
      key: 0,
      label: <p className="font-semibold">Tăng dần</p>,
      name: "Giá tăng dần",
    },
    {
      key: 1,
      label: <p className="font-semibold">Giảm dần</p>,
      name: "Giá giảm dần",
    },
  ];
  const handleOpenChange = (id) => {
    setOpen(id);
    setIsOpen(true);
  };
  res.map((item) => {
    if (!arr.includes(item.properties[open - 1].properties)) {
      arr.push(item.properties[open - 1].properties);
    }
  });
  const handelFilter = (data, name) => {
    if (filterArr.length > 0) {
      let isExitName = false;
      let isExitValue = false;
      var index = filterArr.findIndex((k) => k.name === name);
      index > -1 ? (isExitName = true) : (isExitName = false);

      if (isExitName) {
        filterArr[index].value.includes(data)
          ? (isExitValue = true)
          : (isExitValue = false);
      }
      if (!isExitName && !isExitValue) {
        return setFilterArr((prev) => [...prev, { name: name, value: [data] }]);
      } else if (isExitName && !isExitValue) {
        return setFilterArr((prev) => [
          ...prev.filter((i) => i.name !== name),
          { name: name, value: [...filterArr[index].value, data] },
        ]);
      } else if (isExitName && isExitValue) {
        if (filterArr[index].value.length <= 1) {
          setFilterArr(filterArr.filter((i) => i.name !== name));
        } else {
          return setFilterArr((prev) => [
            ...prev.filter((i) => i.name !== name),
            {
              name: name,
              value: filterArr[index].value.filter((i) => i !== data),
            },
          ]);
        }
      }
    } else {
      return setFilterArr([{ name: name, value: [data] }]);
    }
  };
  if (filterArr.length > 0) {
    filterArr.map((item) => {
      arrItem.push(...item.value);
      if (!arrTitle.includes(item.name)) {
        return arrTitle.push(item.name);
      }
    });
  }

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  const handelClearFilter = () => {
    setFilterArr([]);
    setFilter(false);
  };
  return (
    <div>
      <div className="w-full bg-gray-300 pb-3">
        <div className="mx-auto flex max-w-7xl lg:px-8 flex-col">
          <div className="flex items-center justify-start gap-x-3 mt-2">
            <Link
              to="/"
              className="text-blue-500 flex items-center font-semibold"
            >
              <HomeOutlined></HomeOutlined>
              Trang chủ
            </Link>
            <span>/</span>
            <span>{location[location.length - 1]} collections</span>
          </div>
          <div className="bg-white rounded-md mt-2 gap-x-3 p-5">
            {res.length > 0 ? (
              <>
                <div className="flex items-center gap-x-3 flex-wrap lg:flex-nowrap  gap-y-4">
                  <Popover
                    title="Bộ lọc"
                    placement="bottom"
                    trigger={"click"}
                    open={filter}
                    onOpenChange={() => setFilter(false)}
                    content={
                      <div className="w-auto">
                        <p className="font-semibold">Tiêu chí đã chọn:</p>
                        <div className="flex items-center gap-x-3">
                          {filterArr.map((item, index) => (
                            <div
                              key={index}
                              className="flex border border-gray-400 p-1 rounded-md"
                            >
                              <span className="mr-1">{item.name}:</span>
                              {item.value.map((val) => (
                                <b className="text-blue-500">{val}, </b>
                              ))}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-blue-500 cursor-pointer"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          ))}
                        </div>
                        <div className="w-full flex justify-center">
                          <button
                            onClick={handelClearFilter}
                            className="mt-3 p-2 text-red-500 border border-red-500 bg-transparent rounded-md flex items-center justify-center"
                          >
                            Xóa bộ lọc
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <button
                      className="p-2 border flex gap-x-2 text-sm relative"
                      onClick={() => setFilter(true)}
                    >
                      {filterArr.length > 0 && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-yellow-500 text-white font-semibold flex items-center justify-center">
                          {filterArr.length}
                        </div>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 26 26"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                        />
                      </svg>
                      Bộ lọc
                    </button>
                  </Popover>
                  {filterLaptop.map((laptopProperty) => (
                    <Popover
                      content={
                        <div className="lg:w-96 min-w-min">
                          <div className="mb-2 flex items-center gap-x-2">
                            {arr.map((item, index) => (
                              <button
                                onClick={() =>
                                  handelFilter(item, laptopProperty.name)
                                }
                                key={index}
                                className={`
                             ${
                               arrItem.includes(item) &&
                               "border-blue-500 text-blue-500"
                             }
                              p-2 border hover:border-blue-500 hover:text-blue-500`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center justify-center gap-x-2">
                            <button
                              onClick={() => setIsOpen(false)}
                              className="border border-red-500 bg-transparent p-2 rounded-md text-red-500"
                            >
                              Bỏ chọn
                            </button>
                            <button className="bg-blue-600 p-2 rounded-md text-white ">
                              Xem kết quả
                            </button>
                          </div>
                        </div>
                      }
                      title={laptopProperty.name}
                      trigger="click"
                      open={open === laptopProperty.id && isOpen}
                      onOpenChange={() => handleOpenChange(laptopProperty.id)}
                      key={laptopProperty.id}
                      placement="bottom"
                    >
                      <button
                        className={`p-2 border flex items-center gap-x-2 text-sm
                       ${
                         arrTitle.includes(laptopProperty.name) &&
                         "text-blue-500 border-blue-500"
                       }
                      `}
                      >
                        {laptopProperty.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </Popover>
                  ))}
                  <Popover
                    content={
                      <div className="lg:w-96 min-w-min">
                        <div className="w-full flex items-center justify-between mb-3">
                          <div className=" border font-semibold border-gray-600 p-2 flex items-center justify-center rounded-md min-w-20">
                            {convertMoney(minValue)}
                          </div>
                          <div className="p-2 flex font-semibold items-center justify-center border border-gray-600 rounded-md">
                            {convertMoney(maxValue)}
                          </div>
                        </div>
                        <div className="mb-2 flex items-center gap-x-2">
                          <MultiRangeSlider
                            className="w-full"
                            subSteps={false}
                            label={false}
                            ruler={false}
                            stepOnly={false}
                            barLeftColor="#e2dbdb"
                            barInnerColor="#24B400"
                            barRightColor="#e2dbdb"
                            thumbLeftColor="rgba(76, 175, 80, 1)"
                            thumbRightColor="rgba(76, 175, 80, 1)"
                            min={1000000}
                            max={9000000}
                            step={1300000}
                            minValue={minValue}
                            maxValue={maxValue}
                            onInput={(e) => {
                              handleInput(e);
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-x-2">
                          <button
                            onClick={() => setOpenPrice(false)}
                            className="border border-red-500 bg-transparent p-2 rounded-md text-red-500"
                          >
                            Bỏ chọn
                          </button>
                          <button className="bg-blue-600 p-2 rounded-md text-white ">
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                    title={"Giá tiền"}
                    trigger="click"
                    open={openPrice}
                    onOpenChange={() => setOpenPrice(false)}
                    placement="bottom"
                  >
                    <button
                      onClick={() => setOpenPrice(true)}
                      className="p-2 border flex gap-x-2 text-sm items-center justify-center"
                    >
                      Giá tiền
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </Popover>
                </div>

                <div className="w-full flex justify-start items-center lg:justify-end mt-3">
                  <Dropdown
                    menu={{
                      items: items,
                      onClick: (e) => setSort(parseInt(e.key)),
                    }}
                    placement="bottom"
                    trigger={"click"}
                  >
                    <button className="p-1 flex items-center justify-center border border-gray-500 rounded-md text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5A.75.75 0 013 8.25h9.75a.75.75 0 010 1.5H3A.75.75 0 012.25 9zm15-.75A.75.75 0 0118 9v10.19l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 111.06-1.06l2.47 2.47V9a.75.75 0 01.75-.75zm-15 5.25a.75.75 0 01.75-.75h9.75a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Xếp theo:
                      <p className="font-bold mx-1">{items[sort].name}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </Dropdown>
                </div>
                <div className="flex flex-wrap mt-3 gap-x-8 gap-y-8 lg:justify-stretch justify-center">
                  {res.map((data, index) => (
                    // <MouseModule key={index} data={data}></MouseModule>
                    <Modules data={data} key={index}></Modules>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold">
                  Hiện chưa có sản phẩm nào
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionModules;
