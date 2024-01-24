import { Modal } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordService } from "../../../Services/AccountServices/ChangePasswordService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalChangePassword({ open, setOpen, email }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [showRePassword, setShowRePassword] = useState("password");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const handelPassword = (valuePassword) => {
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };
    strengthChecks.length = valuePassword.length >= 8;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(valuePassword);
    strengthChecks.hasLowCase = /[a-z]+/.test(valuePassword);
    strengthChecks.hasDigit = /[0-9]+/.test(valuePassword);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(valuePassword);

    let verifiedList = Object.values(strengthChecks).filter((value) => value);
    const strength =
      verifiedList.length === 5
        ? "Mạnh"
        : verifiedList.length >= 2
        ? "Trung bình"
        : "Yếu";
    setPassword(valuePassword);
    setMessage(strength);
  };
  const getActiveColor = (type) => {
    if (type === "Mạnh") return "green";
    if (type === "Trung bình") return "#e2e21d";
    return "red";
  };
  const onSubmit = async (data) => {
    const res = await changePasswordService({
      email: email,
      password: data.Password,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      toast.success("Thay đổi mật khẩu thành công");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Modal
      title={<h2 className="text-2xl text-center">THAY ĐỔI MẬT KHẨU</h2>}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
      zIndex={30}
      footer={null}
    >
      <div className="flex items-center justify-center">
        <form
          class="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class="mb-4 flex flex-col gap-8">
            <div
              class={`relative h-11 w-full min-w-[200px] ${
                password.length !== 0 && "mb-3"
              }`}
            >
              <input
                {...register("Password", {
                  required: true,
                  minLength: 3,
                  maxLength: 15,
                })}
                value={password}
                onChange={(e) => handelPassword(e.target.value)}
                type={showPassword}
                class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeHolder=" "
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Mật khẩu
              </label>

              {showPassword === "password" ? (
                <svg
                  onClick={() => setShowPassword("text")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setShowPassword("password")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
              {errors.Password?.type === "required" && (
                <p className="text-red-500 font-normal">
                  *Vui lòng nhập mật khẩu
                </p>
              )}
              {errors.Password?.type === "maxLength" && (
                <span className="text-red-500 font-normal">
                  Mật khẩu phải từ 3 đến 15 ký tự
                </span>
              )}
              {errors.Password?.type === "minLength" && (
                <span className="text-red-500 font-normal">
                  Mật khẩu phải từ 3 đến 15 ký tự
                </span>
              )}
              {password.length !== 0 && (
                <p
                  style={{
                    fontWeight: 600,
                    color: getActiveColor(message),
                  }}
                >
                  Bảo mật: {message}
                </p>
              )}
            </div>
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                {...register("RePassword", {
                  required: true,
                  validate: (val) => {
                    if (watch("Password") !== val) {
                      return "Mật khẩu nhập lại không trùng với mật khẩu";
                    }
                  },
                })}
                type={showRePassword}
                class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeHolder=" "
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Nhập lại mật khẩu
              </label>

              {showRePassword === "password" ? (
                <svg
                  onClick={() => setShowRePassword("text")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setShowRePassword("password")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
              {errors.RePassword?.type === "validate" && (
                <p className="text-red-500">{errors.RePassword.message}</p>
              )}
            </div>
          </div>
          <button
            className={`mt-10 block w-full select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="submit"
            data-ripple-light="true"
          >
            Gửi
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalChangePassword;
