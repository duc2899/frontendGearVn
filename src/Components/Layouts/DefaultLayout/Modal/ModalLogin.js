import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { loginAccountService } from "../../../Services/AuthServices/LoginAccountService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetCookie from "../../../Utils/Cookie/SetCookie";
import { UserContext } from "../../../Context/AccountUser";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginAccountWithGoogleService } from "../../../Services/AuthServices/LoginAccountWithGoogle";
import GetCookie from "../../../Utils/Cookie/GetCookie";
import DeleteCookie from "../../../Utils/Cookie/DeleteCookie";

function ModalLogin({ open, setOpen, setRegister, setForgotPass }) {
  const { setUserAccount, setIsLogin } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState("password");
  const [isRemember, setIsRemember] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const fetchAPI = async () => {
      if (isRemember) {
        SetCookie(
          "rememberAccount",
          {
            ...data,
          },
          2
        );
      } else {
        DeleteCookie("rememberAccount");
      }
      const result = await loginAccountService(data);
      if (result.status === 200) {
        setUserAccount(result.data);
        setOpen(false);
        toast.success("Đăng nhập hệ thống thành công");
        SetCookie(
          "user",
          {
            email: result.data.email,
            token: result.data.accessToken,
            type: result.data.type,
          },
          1
        );
        setIsLogin(true);
      } else {
        toast.error(result.message);
      }
    };
    fetchAPI();
  };
  const handelSwitchModal = () => {
    setOpen(false);
    setRegister(true);
  };
  const handelResponseLoginGoogle = (data) => {
    const decoded = jwtDecode(data.credential);
    loginAccountWithGoogleService({
      email: decoded.email,
      name: decoded.name,
    }).then((d) => {
      setUserAccount(d.data);
      setOpen(false);
      toast.success("Đăng nhập hệ thống thành công");
      SetCookie(
        "user",
        {
          email: d.data.email,
          token: d.data.accessToken,
          type: d.data.type,
        },
        1
      );
      setIsLogin(true);
    });
  };

  useEffect(() => {
    if (GetCookie("rememberAccount")) {
      setIsRemember(true);
      setValue("email", GetCookie("rememberAccount").email);
      setValue("password", GetCookie("rememberAccount").password);
    }
  }, []);
  return (
    <Modal
      title={<h2 className="text-2xl text-center">ĐĂNG NHẬP TÀI KHOẢN</h2>}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
      zIndex={30}
      footer={null}
    >
      <div className="flex items-center justify-center">
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class="mb-4 flex flex-col gap-8">
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                {...register("email", {
                  required: true,
                })}
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeHolder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
              {errors.email?.type === "required" && (
                <p className="text-red-500 font-normal">*Vui lòng nhập email</p>
              )}
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
              <input
                {...register("password", {
                  required: true,
                })}
                type={showPassword}
                className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeHolder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
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
              {errors.password?.type === "required" && (
                <p className="text-red-500 font-normal">
                  *Vui lòng nhập mật khẩu
                </p>
              )}
              <div className="w-full flex justify-end items-center ">
                <p
                  onClick={() => {
                    setForgotPass(true);
                    setOpen(false);
                  }}
                  className="w-fit mt-2 cursor-pointer italic hover:text-red-400 transition-all"
                >
                  Quên mật khẩu?
                </p>
              </div>
            </div>
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="check"
              >
                <input
                  type="checkbox"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  id="check"
                  checked={isRemember}
                  onChange={() => setIsRemember(!isRemember)}
                />
                <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                class="mt-px font-normal text-gray-700 cursor-pointer select-none"
                htmlFor="check"
              >
                Nhớ tài khoản
              </label>
            </div>
          </div>
          <button
            className={`mt-2 mb-3 block w-full select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="submit"
            data-ripple-light="true"
          >
            Đăng nhập
          </button>
          <div className="flex items-center justify-center mb-2 ">
            <p className="inline-block ">Hoặc đăng nhập bằng</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handelResponseLoginGoogle(credentialResponse)
              }
              onError={() => {
                toast.error("Hệ thống đang xảy ra lỗi. Vui lòng nhập lại");
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-x-2 mt-2">
            <span>Bạn chưa có tài khoản?</span>
            <p
              onClick={handelSwitchModal}
              class="text-blue-500 hover:underline cursor-pointer"
            >
              Đăng ký
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalLogin;
