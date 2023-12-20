import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { TextField } from "@mui/material";
function ModalAddress({ open, setOpen, data }) {
  const handelCancel = () => {
    setOpen({
      isOpen: false,
    });
  };
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [currentCity, setCurrentCity] = useState({
    id: open.isEdit ? data.city.code : "",
    name: open.isEdit ? data.city.name : "defaultCity",
  });
  const [currentDistricts, setCurrentDistricts] = useState({
    id: open.isEdit ? data.districts.code : "",
    name: open.isEdit ? data.districts.name : "defaultDis",
  });
  const [currentWard, setCurrentWard] = useState({
    id: open.isEdit ? data.ward.code : "",
    name: open.isEdit ? data.ward.name : "defaultWard",
  });
  const [address, setAddress] = useState(open.isEdit ? data.address : "");
  const [wards, setWards] = useState([]);
  const [name, setName] = useState(open.isEdit ? data.userName : "");
  const [phone, setPhone] = useState(open.isEdit && data.phoneNumber);
  const [error, setError] = useState([]);

  useEffect(() => {
    const getCity = async () => {
      const result = await axios.get("https://provinces.open-api.vn/api/");
      setCity(result.data);
    };
    getCity();
  }, []);
  useEffect(() => {
    if (currentCity.name !== "defaultCity") {
      const getDistricts = async () => {
        const result = await axios.get(
          `https://provinces.open-api.vn/api/p/${currentCity.id}?depth=2`
        );
        setDistricts(result.data.districts);
      };
      getDistricts();
    }
    setDistricts([]);
  }, [currentCity]);
  useEffect(() => {
    if (currentDistricts.name !== "defaultDis") {
      const getWards = async () => {
        const result = await axios.get(
          `https://provinces.open-api.vn/api/d/${currentDistricts.id}?depth=2`
        );
        setWards(result.data.wards);
      };
      getWards();
    }
    setWards([]);
  }, [currentDistricts]);
  const handelOnClick = () => {
    const result = {};
    if (!name) {
      if (!error.includes("errorName"))
        setError((prev) => [...prev, "errorName"]);
      return;
    }
    setError(error.filter((err) => err !== "errorName"));
    if (!phone) {
      if (!error.includes("errorPhone"))
        setError((prev) => [...prev, "errorPhone"]);
      return;
    }
    setError(error.filter((err) => err !== "errorPhone"));
    if (currentCity.name === "defaultCity") {
      if (!error.includes("errorCity"))
        setError((prev) => [...prev, "errorCity"]);
      return;
    }
    setError(error.filter((err) => err !== "errorCity"));
    if (currentDistricts.name === "defaultDis") {
      if (!error.includes("errorDis"))
        setError((prev) => [...prev, "errorDis"]);
      return;
    }
    setError(error.filter((err) => err !== "errorDis"));
    if (currentWard.name === "defaultWard") {
      if (!error.includes("errorWard"))
        setError((prev) => [...prev, "errorWard"]);
      return;
    }
    setError(error.filter((err) => err !== "errorWard"));
    if (address === "") {
      if (!error.includes("errorAddress"))
        setError((prev) => [...prev, "errorAddress"]);
      return;
    }
    result.name = name;
    result.phone = phone;
    result.city = currentCity;
    result.district = currentDistricts;
    result.ward = currentWard;
    console.log(result);
  };
  return (
    <Modal
      title={
        !open.isEdit ? (
          <p className="font-semibold text-xl">ĐỊA CHỈ MỚI</p>
        ) : (
          <p className="font-semibold text-xl">CẬP NHẬT ĐỊA CHỈ MỚI</p>
        )
      }
      open={open.isOpen}
      onCancel={handelCancel}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
    >
      <div>
        <h3 className="font-semibold text-base my-2">Thông tin khách hàng</h3>
        <div class="relative h-11 w-full ">
          <input
            type="text"
            class={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              error.includes("errorName") && "border-red-500"
            }`}
            placeHolder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Nhập họ tên
          </label>
        </div>
        <div class="relative h-11 w-full mt-2">
          <input
            type="number"
            value={phone}
            class={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              error.includes("errorPhone") && "border-red-500"
            }`}
            placeHolder=" "
            onChange={(e) => setPhone(e.target.value)}
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Số điện thoại
          </label>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-base my-2">Địa chỉ nhận hàng</h3>
        <div className="grid bg-gray-200 rounded-sm p-4 gap-4 grid-cols-2 grid-rows-2 max-lg:grid-cols-1 max-lg:grid-rows-4">
          <div className="col-span-1">
            <select
              className={`border border-gray-500 p-1 rounded-sm w-full h-10 font-medium ${
                error.includes("errorCity") && "border-red-500 border-2"
              }`}
              onChange={(e) =>
                setCurrentCity({
                  id: e.target.value,
                  name: e.target.selectedOptions[0].innerText,
                })
              }
            >
              <option value={currentCity.id}>
                {open.isEdit ? data.city.name : "Chọn Tỉnh, Thành Phố"}
              </option>
              {city.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className={`border border-gray-500 p-1 rounded-sm w-full h-10 font-medium ${
                error.includes("errorDis") && "border-red-500 border-2 "
              }`}
              onChange={(e) =>
                setCurrentDistricts({
                  id: e.target.value,
                  name: e.target.selectedOptions[0].innerText,
                })
              }
            >
              <option value={currentDistricts.id}>
                {open.isEdit ? data.districts.name : "Chọn Quận, Huyện"}
              </option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <select
              className={`border border-gray-500 p-1 rounded-sm w-full h-10 font-medium ${
                error.includes("errorWard") && "border-red-500 border-2 "
              }`}
              onChange={(e) =>
                setCurrentWard({
                  id: e.target.value,
                  name: e.target.selectedOptions[0].innerText,
                })
              }
            >
              <option value={currentDistricts.id}>
                {open.isEdit ? data.ward.name : "Chọn Phường, Xã"}
              </option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div class="relative h-11 w-full">
            <input
              class={`peer h-full w-full rounded-md border ${
                error.includes("errorAddress") && "border-red-500 border-2"
              } border-gray-500 bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 `}
              placeholder=" "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Số nhà, tên đường
            </label>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button
          onClick={handelOnClick}
          className="p-3 w-full mt-2 bg-red-600 rounded-sm text-white font-semibold"
        >
          HOÀN THÀNH
        </button>
      </div>
    </Modal>
  );
}

export default ModalAddress;
