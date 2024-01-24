import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editAccountService } from "../../../../Services/AccountServices/EditAccountService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InforAccount({ Data, setReload }) {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    data.id = UserData.id;
    const fetchAPI = async () => {
      const res = await editAccountService(data);
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setUserData(res.data.data);
          setIsEdit(false);
          toast.success("Thay đổi thông tin thành công");
          setReload(true);
        }, 2000);
      } else {
        setLoading(false);
        toast.error("Hệ thống đang gặp lõi");
      }
    };
    fetchAPI();
  };
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-3">Thông tin tài khoản</h1>
      <div className="flex items-center gap-x-3 mb-2 justify-between">
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
      <div className="flex items-center gap-x-3 mb-2  justify-between">
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
      <div className="flex items-center gap-x-3 mb-2  justify-between">
        <p className="font-medium">Email:</p>
        <p>{handelEndCodeEmail()}</p>
      </div>

      <div className="mt-3">
        {isEdit ? (
          <div className="flex items-center gap-x-3">
            <button
              onClick={() => setIsEdit(false)}
              className="p-2 bg-red-500 rounded-md text-white font-semibold w-32"
            >
              Hủy
            </button>

            <button
              disabled={!isChange || loading}
              onClick={handleSubmit(handelEdit)}
              className="p-2 bg-blue-500 rounded-md text-white font-semibold disabled:opacity-40 w-32"
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
                " Lưu thay đổi"
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="p-2 bg-red-500 rounded-md text-white font-semibold hover:opacity-80 transition-opacity"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
}

export default InforAccount;
