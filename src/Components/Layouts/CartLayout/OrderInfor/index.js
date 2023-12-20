import React, { useEffect, useState } from "react";
import convertMoney from "../../../Utils/ConvertMoney";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import ModalStoreAddress from "./ModalStoreAddress";
const SEX = [
  {
    id: 0,
    name: "Anh",
  },
  {
    id: 1,
    name: "Chị",
  },
];
function OrderInfor({ Data, onChange, dataOrder, setDataOrder }) {
  const dataAddress = {
    addressNote: [
      {
        id: 1,
        userName: "Bui Duc",
        phoneNumber: "0965417187",
        city: {
          name: "Hà Nội",
          code: 1,
        },
        districts: {
          name: "Quận Ba Đình",
          code: 1,
        },
        ward: {
          name: "Phường Phúc Xá",
          code: 1,
        },
        address: "so nha 1, ngach 12",
      },
      {
        id: 2,
        userName: "Quang Duc",
        phoneNumber: "0965417187",
        city: {
          name: "Hà Nội",
          code: 1,
        },
        districts: {
          name: "Quận Ba Đình",
          code: 1,
        },
        ward: {
          name: "Phường Phúc Xá",
          code: 1,
        },
        address: "so nha 1, ngach 123",
      },
    ],
  };
  const result = {};
  const [open, setOpen] = useState(false);
  const [resultChoose, setResultChoose] = useState(null);

  const [sex, setSex] = useState(0);
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [currentCity, setCurrentCity] = useState({
    id: "",
    name: "defaultCity",
  });
  const [currentDistricts, setCurrentDistricts] = useState({
    id: "",
    name: "defaultDis",
  });
  const [currentWard, setCurrentWard] = useState({
    id: "",
    name: "defaultCity",
  });

  const [address, setAddress] = useState("");
  const [wards, setWards] = useState([]);
  const [name, setName] = useState("Bui Duc");
  const [phone, setPhone] = useState();
  const [error, setError] = useState([]);
  const [note, setNote] = useState("");

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
  useEffect(() => {
    if (resultChoose !== null) {
      setName(dataAddress.addressNote[resultChoose].userName);
      setPhone(dataAddress.addressNote[resultChoose].phoneNumber);
      setCurrentCity({
        id: dataAddress.addressNote[resultChoose].city.code,
        name: dataAddress.addressNote[resultChoose].city.name,
      });
      setCurrentDistricts({
        id: dataAddress.addressNote[resultChoose].districts.code,
        name: dataAddress.addressNote[resultChoose].districts.name,
      });
      setCurrentWard({
        id: dataAddress.addressNote[resultChoose].ward.code,
        name: dataAddress.addressNote[resultChoose].ward.name,
      });
      setAddress(dataAddress.addressNote[resultChoose].address);
    }
  }, [resultChoose]);
  const handelOnClick = () => {
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
    if (currentWard === "") {
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
    result.addressHome = address;
    result.note = note;
    setDataOrder(result);
    onChange();
  };
  return (
    <>
      <div className="p-2">
        <div>
          <h3 className="font-semibold text-xl">Thông tin khách mua hàng</h3>
          <div>
            <div className="flex items-center gap-x-4 mb-3 mt-2">
              {SEX.map((type) => (
                <label
                  htmlFor={type.name}
                  key={type.id}
                  className="font-medium"
                >
                  <input
                    type="radio"
                    className="mr-2 mt-1 cursor-pointer"
                    checked={sex === type.id}
                    onChange={() => setSex(type.id)}
                  />
                  {type.name}
                </label>
              ))}
            </div>
            <div className="flex items-center gap-x-2 max-lg:flex-col max-lg:gap-y-2">
              <div class="relative h-11 w-full ">
                <input
                  value={name}
                  class={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${
                    error.includes("errorName") && "border-red-500"
                  }`}
                  placeHolder=" "
                  onChange={(e) => setName(e.target.value)}
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Nhập họ tên
                </label>
              </div>
              <div class="relative h-11 w-full ">
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
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl my-2">Địa chỉ nhận hàng</h3>
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 rounded-md text-white font-medium p-1 pr-2 text-sm flex items-center"
            >
              <AddIcon fontSize="small"></AddIcon>
              Chọn địa chỉ
            </button>
          </div>
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
                <option value={"defaultCity"}>
                  {currentCity.name !== "defaultCity"
                    ? currentCity.name
                    : "Chọn Tỉnh, Thành Phố"}
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
                <option value={"defaultDis"}>
                  {currentDistricts.name !== "defaultDis"
                    ? currentDistricts.name
                    : "Chọn Quận, Huyện"}
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
                <option value={"defaultWard"}>
                  {currentWard.name !== "defaultCity"
                    ? currentWard.name
                    : "Chọn Phường, Xã"}
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
          <div class="relative h-11 w-full mt-3">
            <input
              class={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 `}
              placeHolder=" "
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Lưu ý, yêu cầu khác (không bắt buộc)
            </label>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between">
          <p className="font-semibold text-lg">Tổng tiền:</p>
          <p className="text-red-500 font-bold text-xl">
            {convertMoney(Data.totalPrice)}
          </p>
        </div>
        <button
          onClick={handelOnClick}
          className="p-3 w-full mt-2 bg-red-600 rounded-sm text-white font-semibold"
        >
          ĐẶT HÀNG NGAY
        </button>
        {open && (
          <ModalStoreAddress
            open={open}
            setOpen={setOpen}
            data={dataAddress.addressNote}
            setResultChoose={setResultChoose}
          ></ModalStoreAddress>
        )}
      </div>
    </>
  );
}

export default OrderInfor;
