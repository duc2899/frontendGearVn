import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { registerAccountService } from "../../../Services/AuthServices/RegisterAccountService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkEmailService } from "../../../Services/AccountServices/CheckEmailService";

function ModalRegister({ open, setOpen, setLogin }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [showRePassword, setShowRePassword] = useState("password");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isValid },
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
  const onSubmit = (data) => {
    if (isValid) {
      setIsLoading(true);
      const { RePassword, ...res } = data;
      const fetchAPI = async () => {
        const result = await registerAccountService(res);
        if (result.status === 201) {
          setTimeout(() => {
            reset();
            setIsLoading(false);
            setOpen(false);
            toast.success("Đăng ký tài khoản thành công");
          }, 3000);
        } else {
          setIsLoading(false);
          toast.error(result.message);
        }
      };
      fetchAPI();
      setMessage("");
    }
  };
  const handelSwitchModal = () => {
    setOpen(false);
    setLogin(true);
  };
  function isValidEmail(email) {
    // Sử dụng regular expression để kiểm tra định dạng email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  // check email and set errors
  useEffect(() => {
    if (isValidEmail(watch("email"))) {
      const fetchAPI = async () => {
        const result = await checkEmailService(watch("email"));
        if (result.status !== 200) {
          setError("email", {
            type: "manual",
            message: "Email đã tồn tại",
          });
        }
      };
      const setTimeoutFetch = setTimeout(() => {
        fetchAPI();
      }, 3000);

      return () => clearTimeout(setTimeoutFetch);
    }
  }, [watch("email")]);
  return (
    <Modal
      title={<h2 className="text-2xl text-center">ĐĂNG KÝ TÀI KHOẢN</h2>}
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
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                {...register("name", {
                  required: true,
                  maxLength: 15,
                  minLength: 3,
                })}
                class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeHolder=" "
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-500">
                Tên
              </label>
              {errors.name?.type === "required" && (
                <p className="text-red-500 font-normal">*Vui lòng nhập tên</p>
              )}
              {errors.name?.type === "maxLength" && (
                <span className="text-red-500 font-normal">
                  Tên phải từ 3 đến 15 ký tự
                </span>
              )}
              {errors.name?.type === "minLength" && (
                <span className="text-red-500 font-normal">
                  Tên phải từ 3 đến 15 ký tự
                </span>
              )}
            </div>
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Địa chỉ Email sai định dạng",
                  },
                })}
                class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeHolder=" "
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
              {errors.email?.type === "required" && (
                <span className="text-red-500 font-normal">
                  *Vui lòng nhập Email
                </span>
              )}
              {errors.email?.message && (
                <span className="text-red-500 font-normal">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    message: "Số điện thoại sai định dạng",
                  },
                })}
                class="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeHolder=" "
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Số điện thoại
              </label>
              {errors.phoneNumber?.type === "required" && (
                <span className="text-red-500 font-normal">
                  *Vui nhập số điện thoại
                </span>
              )}
              {errors.phoneNumber?.message && (
                <span className="text-red-500 font-normal">
                  {errors.phoneNumber?.message}
                </span>
              )}
            </div>
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                {...register("password", {
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
              {errors.password?.type === "required" && (
                <p className="text-red-500 font-normal">
                  *Vui lòng nhập mật khẩu
                </p>
              )}
              {(errors.password?.type === "maxLength" ||
                errors.password?.type === "minLength") && (
                <span className="text-red-500 font-normal">
                  Mật khẩu phải từ 3 đến 15 ký tự
                </span>
              )}

              {password.length !== 0 && message !== "" && (
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
                    if (watch("password") !== val) {
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
            disabled={isLoading}
            className={`mt-10 block w-full select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="submit"
            data-ripple-light="true"
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-400 fill-gray-400 dark:fill-gray-300"
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
              "Đăng ký"
            )}
          </button>
          <div className="flex items-center justify-center gap-x-2 mt-2">
            <span>Bạn đã có tài khoản?</span>
            <p
              onClick={handelSwitchModal}
              class="text-blue-500 hover:underline cursor-pointer"
            >
              Đăng nhập
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalRegister;
