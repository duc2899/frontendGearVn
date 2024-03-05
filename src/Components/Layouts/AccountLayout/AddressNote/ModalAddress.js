import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useForm } from "react-hook-form";
import { createAddressNoteService } from "../../../Services/AddressNoteServices/CreateAddressNoteService";
import { getAddressNoteService } from "../../../Services/AddressNoteServices/GetAddressNoteService";
import { editAddressNoteService } from "../../../Services/AddressNoteServices/EditAddressNoteService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalAddress({ open, setOpen, dataEdit, idUser, setData }) {
  const [loading, setLoading] = useState(false);
  const [resultChoose, setResultChoose] = useState(dataEdit);
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
      setValue("name", resultChoose.nameCustomer);
      setValue("address", resultChoose.homeAddress);
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
      const result = await axios.get("https://vapi.vnappmob.com/api/province");
      setCity(result.data.results);
    };
    getCity();
  }, []);
  useEffect(() => {
    if (currentCity.code) {
      const getDistricts = async () => {
        const result = await axios.get(
          `https://vapi.vnappmob.com/api/province/district/${currentCity.code}`
        );
        setDistricts(result.data.results);
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
          `https://vapi.vnappmob.com/api/province/ward/${currentDistricts.code}`
        );
        setWards(result.data.results);
        if (!resultChoose) {
          setCurrentWard({ code: "", name: "Chọn Phường, Xã" });
        }
      };
      getWards();
    }
    setWards([]);
  }, [currentDistricts, resultChoose]);

  const handelCancel = () => {
    setOpen({
      isOpen: false,
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const result = {
      idUser: idUser,
      city: currentCity,
      ward: currentWard,
      district: currentDistricts,
      phoneNumber: data.phoneNumber,
      nameCustomer: data.name,
      homeAddress: data.address,
    };
    if (!dataEdit) {
      const res = await createAddressNoteService(result);
      if (res.status === 200) {
        const fetchAPIGet = async () => {
          const res = await getAddressNoteService(idUser);
          setTimeout(() => {
            setLoading(false);
            setData(res.data);
            setOpen(false);
            toast.success("Thêm địa chỉ thành công");
          }, 2000);
        };
        fetchAPIGet();
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    } else {
      result.idAddressNote = dataEdit.id;
      result.district.id = dataEdit.district.id;
      result.ward.id = dataEdit.ward.id;
      result.city.id = dataEdit.city.id;
      const res = await editAddressNoteService(result);
      if (res.status === 200) {
        const fetchAPIGet = async () => {
          const res = await getAddressNoteService(idUser);
          setTimeout(() => {
            setLoading(false);
            setData(res.data);
            setOpen(false);
            toast.success("Sửa địa chỉ thành công");
          }, 2000);
        };
        fetchAPIGet();
      } else {
        setLoading(false);
        toast.error(res.message);
      }
    }
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
            <h3 className="font-semibold text-xl mb-2">Thông tin khách hàng</h3>
            <div>
              <div className="flex items-center gap-x-2 max-lg:flex-col max-lg:gap-y-2">
                <div className="relative h-11 w-full ">
                  <input
                    type="text"
                    className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    placeholder=" "
                    {...register("name", { required: "Vui lòng nhập tên" })}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Nhập họ tên
                  </label>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </div>
                <div className="relative h-11 w-full ">
                  <input
                    type="number"
                    className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    placeholder=" "
                    {...register("phoneNumber", {
                      required: "Vui lòng nhập số diện thoại",
                      pattern: {
                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                        message: "Số điện thoại sai định dạng",
                      },
                    })}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
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
              <div className="grid bg-gray-200 rounded-md p-4 gap-4 grid-cols-2 grid-rows-2 max-lg:grid-cols-1 max-lg:grid-rows-4">
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
                      <option key={item.province_id} value={item.province_id}>
                        {item.province_name}
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
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
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
                    className={`border border-gray-500 p-1 rounded-md w-full h-10 font-medium`}
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
                      <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                      </option>
                    ))}
                  </select>
                  {errors.ward?.type === "required" && (
                    <p className="text-red-500 w-fit h-fit">
                      {errors.ward.message}
                    </p>
                  )}
                </div>
                <div className="relative h-11 w-full mb-3">
                  <input
                    className={`peer h-full w-full rounded-md border border-gray-500 bg-white px-3 py-3 font-sans text-sm font-medium text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 `}
                    placeholder=" "
                    {...register("address", {
                      required: "Vui lòng chọn số nhà, tên đường",
                    })}
                  />

                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
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
              disabled={loading}
              type="submit"
              className="p-3 w-full bg-red-600 text-white font-semibold text-base rounded-md mt-4 hover:opacity-70 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Hoàn thành"
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAddress;
