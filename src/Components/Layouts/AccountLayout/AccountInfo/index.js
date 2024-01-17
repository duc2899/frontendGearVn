import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editAccountService } from "../../../Services/AccountServices/EditAccountService";
function AccountInfo({ Data }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [UserData, setUserData] = useState(Data);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handelEndCodePhoneNumber = () => {
    const newNum = UserData.phoneNumber.slice(0, 5);
    return newNum.padEnd(10, "*");
  };
  const handelEndCodeEmail = () => {
    const arrString = UserData?.email.split("@");
    const str1 = arrString[0].slice(0, 4).padEnd(arrString[0].length, "*");
    return str1 + "@" + arrString[1];
  };

  useEffect(() => {
    if (
      watch(["userName", "phoneNumber"])[0] !== UserData.userName ||
      watch(["userName", "phoneNumber"])[1] !== UserData.phoneNumber
    ) {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(["userName", "phoneNumber"])]);

  const handelEdit = (data) => {
    data.id = UserData.id;
    const fetchAPI = async () => {
      const res = await editAccountService(data);
      if (res.status === 200) {
        setUserData(res.data.data);
        setIsEdit(false);
      }
    };
    fetchAPI();
  };

  return (
    <div className="bg-white rounded-md p-4 w-3/4 max-sm:w-full min-h-96">
      <h1 className="font-semibold text-2xl mb-3">Thông tin tài khoản</h1>
      <div className="flex items-center gap-x-3 mb-2 w-2/6 justify-between">
        <p className="font-medium">Họ Tên: </p>
        {isEdit ? (
          <div className="flex items-start flex-col">
            <input
              className="p-2 rounded-md bg-white border focus:outline-none"
              defaultValue={UserData.userName}
              {...register("userName", {
                required: true,
                minLength: 3,
                maxLength: 15,
              })}
              type="text"
            />
            {errors.userName?.type === "required" && (
              <div className="text-red-500 font-semibold te,xt-sm">
                Trường bắt buộc
              </div>
            )}
            {errors.userName?.type === "maxLength" ||
              (errors.userName?.type === "minLength" && (
                <div className="text-red-500 font-semibold te,xt-sm">
                  Tên chỉ được phép từ 3 đến 15 ký tự
                </div>
              ))}
          </div>
        ) : (
          <h2 className="font-bold">{UserData.userName}</h2>
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
        <p>{handelEndCodeEmail()}</p>
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
