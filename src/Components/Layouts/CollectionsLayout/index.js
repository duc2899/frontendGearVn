import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import { Dropdown, Popover } from "antd";
import ProductModules from "../Modules/ProductModules";
import { getAllProduct } from "../../Services/ProductsServices/GetAllProductService";
import { Empty, Pagination } from "antd";
import { searchCollectionService } from "../../Services/ProductsServices/SearchCollectionsService";
function CollectionModules() {
  const [res, setRes] = useState({});
  const location = window.location.pathname.split("/");
  const [page, setPage] = useState(0);
  useEffect(() => {
    fetchProductTotal(location[location.length - 1], page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location[location.length - 1], page]);

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

  const arr = [];
  const arrTitle = [];
  const arrItem = [];
  const [open, setOpen] = useState(1);
  const [filter, setFilter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState(0);
  const [filterArr, setFilterArr] = useState([]);

  const items = [
    {
      key: 1,
      label: <p className="font-semibold">Tăng dần</p>,
      name: "Giá tăng dần",
    },
    {
      key: 2,
      label: <p className="font-semibold">Giảm dần</p>,
      name: "Giá giảm dần",
    },
  ];
  // useEffect(() => {
  //   if(sort){

  //   }
  // }, [sort])
  const handleOpenChange = (id) => {
    setOpen(id);
    setIsOpen(true);
  };
  res.data?.map((item) => {
    if (!arr.includes(item.properties[open - 1].properties)) {
      return arr.push(item.properties[open - 1].properties);
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

  const handelClearFilter = () => {
    setFilterArr([]);
    setFilter(false);
    fetchProductTotal(location[location.length - 1], page);
  };

  const handelChangePage = (data) => {
    setPage(data - 1);
  };

  const handelResult = async () => {
    if (filterArr.length > 0) {
      const result = {};
      filterArr.map((item) => (result[item.name.toLowerCase()] = item.value));
      const fetchAPI = await searchCollectionService(
        location[location.length - 1],
        0,
        4,
        result
      );
      setRes(fetchAPI);
    }
  };
  const fetchProductTotal = (type, page) => {
    if (type === "laptop") {
      const fetchAPI = async () => {
        try {
          const data = await getAllProduct("laptop", page, 15);
          setRes(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAPI();
      return;
    } else if (type === "mouse") {
      const fetchAPI = async () => {
        try {
          const data = await getAllProduct("mouse", page, 15);
          setRes(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAPI();
      return;
    } else if (type === "keyboard") {
    } else {
      console.log("12");
    }
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
            {Object.keys(res).length > 0 && res.data?.length > 0 ? (
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
                  {res?.data[0]?.properties.map((laptopProperty, index) => (
                    <Popover
                      content={
                        <div className="lg:w-96 min-w-min" key={index}>
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
                            <button
                              onClick={handelResult}
                              className="bg-blue-600 p-2 rounded-md text-white "
                            >
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
                  {res.data?.map((data, index) => (
                    <Modules data={data} key={index}></Modules>
                  ))}
                </div>
                {Object.keys(res).length > 0 && (
                  <div className="flex items-center justify-center mt-5">
                    <Pagination
                      onChange={handelChangePage}
                      defaultCurrent={1}
                      total={res.totalElements}
                      defaultPageSize={15}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-screen">
                <Empty description="Hiện chưa có sản phẩm nào"></Empty>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionModules;
