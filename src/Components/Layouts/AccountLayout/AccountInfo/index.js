import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AccountInfo({ UserData }) {
  const [isEdit, setIsEdit] = useState(false);

  const [isChange, setIsChange] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm();

  const handelEndCodePhoneNumber = () => {
    const newNum = UserData.phoneNumber.slice(0, 5);
    return newNum.padEnd(10, "*");
  };
  const handelEndCodeEmail = () => {
    const arrString = UserData.email.split("@");
    const str1 = arrString[0].slice(0, 4).padEnd(arrString[0].length, "*");
    return str1 + "@" + arrString[1];
  };

  useEffect(() => {
    if (
      watch(["userName", "phoneNumber", "email"])[0] !== UserData.userName ||
      watch(["userName", "phoneNumber", "email"])[1] !== UserData.phoneNumber ||
      watch(["userName", "phoneNumber", "email"])[2] !== UserData.email
    ) {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
  }, [watch(["userName", "phoneNumber", "email"])]);

  const handelEdit = (data) => {
    console.log(data);
    setIsEdit(false);
  };
  return (
    <div className="bg-white rounded-md p-4 w-3/4 max-sm:w-full">
      <h1 className="font-semibold text-2xl mb-3">Thông tin tài khoản</h1>
      <div className="flex items-center gap-x-3 mb-2 w-2/6 justify-between">
        <p className="font-medium">Họ Tên: </p>
        {isEdit ? (
          <div className="flex items-start flex-col">
            <input
              className="p-2 rounded-md bg-white border focus:outline-none"
              defaultValue={UserData.userName}
              {...register("userName", { required: true })}
              type="text"
            />
            {errors.userName?.type === "required" && (
              <div className="text-red-500 font-semibold text-sm">
                Trường bắt buộc
              </div>
            )}
          </div>
        ) : (
          <h2 className="font-bold">Bui Duc</h2>
        )}
      </div>
      <div className="flex items-center gap-x-3 mb-2  w-2/6 justify-between">
        <p className="font-medium">Số điện thoại:</p>
        {isEdit ? (
          <div>
            <input
              className="p-2 rounded-md bg-white border focus:outline-none"
              defaultValue={UserData.phoneNumber}
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Số điện thoại sai định dạng",
                },
              })}
              type="text"
            />
            {errors.phoneNumber?.type === "required" && (
              <div className="text-red-500 font-semibold text-sm">
                Trường bắt buộc
              </div>
            )}
            {errors.phoneNumber?.message && (
              <div className="text-red-500 font-semibold text-sm">
                {errors.phoneNumber?.message}
              </div>
            )}
          </div>
        ) : (
          <p>{handelEndCodePhoneNumber()}</p>
        )}
      </div>
      <div className="flex items-center gap-x-3 mb-2  w-2/6 justify-between">
        <p className="font-medium">Email:</p>
        {isEdit ? (
          <div>
            <input
              className="p-2 rounded-md bg-white border focus:outline-none"
              defaultValue={UserData.email}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Địa chỉ Email sai định dạng",
                },
              })}
              type="text"
            />
            {errors.email?.type === "required" && (
              <div className="text-red-500 font-semibold text-sm">
                Trường bắt buộc
              </div>
            )}
            {errors.email?.message && (
              <div className="text-red-500 font-semibold text-sm">
                {errors.email?.message}
              </div>
            )}
          </div>
        ) : (
          <p>{handelEndCodeEmail()}</p>
        )}
      </div>
      <div className="mt-3">
        {isEdit ? (
          <div className="flex items-center gap-x-3">
            <button
              onClick={() => setIsEdit(false)}
              className="p-2 bg-red-500 rounded-md text-white font-semibold"
            >
              Hủy
            </button>
            <button
              disabled={!isChange}
              onClick={handleSubmit(handelEdit)}
              className="p-2 bg-blue-500 rounded-md text-white font-semibold disabled:opacity-40"
            >
              Lưu thay đổi
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="p-2 bg-red-500 rounded-md text-white font-semibold"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
}

export default AccountInfo;
