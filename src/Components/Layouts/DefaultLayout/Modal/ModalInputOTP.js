import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalInputOTP({ open, setOpen, setOpenChangePass }) {
  const [otp, setOtp] = useState("");
  const [checkOTP, setCheckOTP] = useState(false);
  const [time, setTime] = useState(60); // Thời gian đếm ngược, đơn vị là giây
  const [timerActive, setTimerActive] = useState(true); // Trạng thái kích hoạt đếm ngược
  useEffect(() => {
    let interval;

    if (timerActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setTimerActive(false); // Tắt đếm ngược khi hết thời gian
    }

    return () => clearInterval(interval); // Hủy đăng ký interval khi component unmount
  }, [timerActive, time]);
  const handelResendOTP = () => {
    setTimerActive(true);
    setTime(100);
    toast.success("Mã OTP đã được gửi lại. Vui lòng kiểm tra lại email");
  };
  const handelResultOTP = () => {
    if (otp.length > 3) {
      //   setCheckOTP(true);
      console.log(otp);
      setOpenChangePass(true);
      setOpen(false);
      //   setTimeout(() => {
      //     setCheckOTP(false);
      //   }, 1000);
    }
  };

  return (
    <Modal
      title={<h2 className="text-2xl text-center">NHẬP MÃ OTP</h2>}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={700}
      zIndex={30}
      footer={null}
    >
      <div className="flex flex-col justify-center items-center">
        <p className="mb-3 font-medium text-gray-400">
          Nhập mã OTP được gửi về địa chỉ Email
          <span className="ml-1 font-semibold text-black">
            Shroudduc@gmail.com
          </span>
        </p>
        <OtpInput
          shouldAutoFocus={true}
          inputStyle={`border outline-red-500 transition-all xl:w-20 w-10 h-14 text-2xl ${
            checkOTP && "animate__animated animate__headShake"
          } `}
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span className="w-8 ml-3">---</span>}
          renderInput={(props) => <input {...props} />}
        />
        {!timerActive ? (
          <p className="mt-3 font-medium text-gray-400 ">
            Chưa nhận được mã OTP?
            <span
              onClick={handelResendOTP}
              className="hover:underline ml-1 cursor-pointer font-semibold text-red-500"
            >
              GỬI LẠI MÃ OTP
            </span>
          </p>
        ) : (
          <p
            className={`mt-3 font-medium ${
              time <= 10 ? "text-red-500" : "text-green-500"
            }`}
          >
            Thời gian còn lại:{" "}
            {Math.floor(time / 60) > 0 && (
              <span className="mr-1">{Math.floor(time / 60)} phút</span>
            )}
            {time % 60} giây
          </p>
        )}
        <div className="flex items-center  justify-center gap-4 mt-4">
          <button
            onClick={() => setOtp("")}
            className="p-2 px-7 rounded-md bg-red-400 text-white font-medium hover:opacity-70 transition-all"
          >
            Xóa
          </button>
          <button
            onClick={handelResultOTP}
            disabled={otp.length <= 3}
            className="p-2 px-7 rounded-md bg-green-400 text-white font-medium hover:opacity-70 transition-all disabled:bg-gray-500 disabled:opacity-100 disabled:cursor-not-allowed"
          >
            Gửi
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalInputOTP;
