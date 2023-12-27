import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
function ModalAddress({ open, setOpen, data }) {
  const handelCancel = () => {
    setOpen({
      isOpen: false,
    });
  };

  const [resultChoose, setResultChoose] = useState(data);
  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [currentCity, setCurrentCity] = useState({
    code: "",
    name: "Chọn Tỉnh, Thành Phố",
  });
  const [currentDistricts, setCurrentDistricts] = useState({
    code: "",
    name: "Chọn Quận, Huyện",
  });
  const [currentWard, setCurrentWard] = useState({
    code: "",
    name: "Chọn Phường, Xã",
  });

  const [wards, setWards] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm(
    { mode: "onChange" },
    {
      defaultValues: {
        name: "",
        address: "",
        phoneNumber: "",
        city: "Chọn Tỉnh, Thành Phố",
        districts: "Chọn Quận, Huyện",
        ward: "Chọn Phường, Xã",
      },
    }
  );
  useEffect(() => {
    if (resultChoose) {
      setValue("name", resultChoose.userName);
      setValue("address", resultChoose.address);
      setValue("phoneNumber", resultChoose.phoneNumber);
      setValue("city", resultChoose.city.code);
      setValue("districts", resultChoose.district.code);
      setValue("ward", resultChoose.ward.code);
      setCurrentCity({
        code: resultChoose.city.code,
        name: resultChoose.city.name,
      });
      setCurrentDistricts({
        code: resultChoose.district.code,
        name: resultChoose.district.name,
      });
      setCurrentWard({
        code: resultChoose.ward.code,
        name: resultChoose.ward.name,
      });
    }
  }, [resultChoose, setValue]);

  useEffect(() => {
    const getCity = async () => {
      const result = await axios.get("https://provinces.open-api.vn/api/");
      setCity(result.data);
    };
    getCity();
  }, []);
  useEffect(() => {
    if (currentCity.code) {
      const getDistricts = async () => {
        const result = await axios.get(
          `https://provinces.open-api.vn/api/p/${currentCity.code}?depth=2`
        );
        setDistricts(result.data.districts);
        if (!resultChoose) {
          setCurrentDistricts({
            code: "",
            name: "Chọn Quận, Huyện",
          });
          setCurrentWard({ code: "", name: "Chọn Phường, Xã" });
        }
      };
      getDistricts();
    }
    setWards([]);
    setDistricts([]);
  }, [currentCity, resultChoose]);

  useEffect(() => {
    if (currentDistricts.code) {
      const getWards = async () => {
        const result = await axios.get(
          `https://provinces.open-api.vn/api/d/${currentDistricts.code}?depth=2`
        );
        setWards(result.data.wards);
        if (!resultChoose) {
          setCurrentWard({ code: "", name: "Chọn Phường, Xã" });
        }
      };
      getWards();
    }
    setWards([]);
  }, [currentDistricts, resultChoose]);

  const onSubmit = (data) => {
    const result = {
      city: currentCity,
      ward: currentWard,
      district: currentDistricts,
      phoneNumber: data.phoneNumber,
      name: data.name,
      addressHome: data.address,
    };
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2">
          <div>
            <h3 className="font-semibold text-xl">Thông tin khách hàng</h3>
            <div>
              <div className="flex items-center gap-x-2 max-lg:flex-col max-lg:gap-y-2">
                <div class="relative h-11 w-full ">
                  <input
                    type="text"
                    class={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    placeHolder=" "
                    {...register("name", { required: "Vui lòng nhập tên" })}
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Nhập họ tên
                  </label>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </div>
                <div class="relative h-11 w-full ">
                  <input
                    type="number"
                    class={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    placeHolder=" "
                    {...register("phoneNumber", {
                      required: "Vui lòng nhập số diện thoại",
                      pattern: {
                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                        message: "Số điện thoại sai định dạng",
                      },
                    })}
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Số điện thoại
                  </label>
                  {(errors.phoneNumber?.type === "required" ||
                    errors.phoneNumber?.type === "pattern") && (
                    <p className="text-red-500 mb-2">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xl my-2">
                  Địa chỉ nhận hàng
                </h3>
              </div>
              <div className="grid bg-gray-200 rounded-sm p-4 gap-4 grid-cols-2 grid-rows-2 max-lg:grid-cols-1 max-lg:grid-rows-4">
                <div className="col-span-1">
                  <select
                    className={`border border-gray-500 p-1 rounded-sm w-full h-10 font-medium`}
                    {...register("city", {
                      required: "Vui lòng chọn Tỉnh, Thành Phố",
                      onChange: (e) => {
                        setResultChoose(null);
                        setCurrentCity({
                          code: e.target.value,
                          name: e.target.selectedOptions[0].innerText,
                        });
                      },
                    })}
                  >
                    <option value={currentCity.code}>{currentCity.name}</option>

                    {city.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.city?.type === "required" && (
                    <p className="text-red-500 w-fit h-fit">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    {...register("districts", {
                      required: "Vui lòng chọn Quận, Huyện",
                      onChange: (e) => {
                        setResultChoose(null);
                        setCurrentDistricts({
                          code: e.target.value,
                          name: e.target.selectedOptions[0].innerText,
                        });
                      },
                    })}
                    className={`border border-gray-500 p-1 rounded-sm w-full h-10 font-medium `}
                  >
                    <option value={currentDistricts.code}>
                      {currentDistricts.name}
                    </option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.districts?.type === "required" && (
                    <p className="text-red-500 w-fit h-fit">
                      {errors.districts.message}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <select
                    className={`border border-gray-500 p-1 rounded-sm w-full h-10 font-medium`}
                    {...register("ward", {
                      required: "Vui lòng chọn Phường, Xã",
                      onChange: (e) =>
                        setCurrentWard({
                          code: e.target.value,
                          name: e.target.selectedOptions[0].innerText,
                        }),
                    })}
                  >
                    <option value={currentWard.code}>{currentWard.name}</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                  {errors.ward?.type === "required" && (
                    <p className="text-red-500 w-fit h-fit">
                      {errors.ward.message}
                    </p>
                  )}
                </div>
                <div class="relative h-11 w-full mb-3">
                  <input
                    class={`peer h-full w-full rounded-md border border-gray-500 bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 `}
                    placeholder=" "
                    {...register("address", {
                      required: "Vui lòng chọn số nhà, tên đường",
                    })}
                  />

                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Số nhà, tên đường
                  </label>
                  {errors.address?.type === "required" && (
                    <p className="text-red-500 w-fit h-fit">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="p-3 w-full mt-2 bg-red-600 rounded-sm text-white font-semibold"
            >
              HOÀN THÀNH
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAddress;
