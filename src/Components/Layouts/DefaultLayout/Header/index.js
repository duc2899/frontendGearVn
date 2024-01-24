import React, { useContext, useEffect, useState } from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { Popover } from "antd";
import ModalRegister from "../Modal/ModalRegister";
import ModalLogin from "../Modal/ModalLogin";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../logo.svg";
import ModalLogout from "../Modal/ModalLogout";
import { UserContext } from "../../../Context/AccountUser";
import ModalForgotPassword from "../Modal/ModalForgotPassword";
import ModalInputOTP from "../Modal/ModalInputOTP";
import ModalChangePassword from "../Modal/ModalChangePassword";
import { CartUserProvider } from "../../../Context/CartUser";
import ProductSearch from "./ProductSearch";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { isLogin, userAccount } = useContext(UserContext);
  const { showCart, setShowCart } = useContext(CartUserProvider);

  useEffect(() => {
    if (showCart) {
      const setShow = setTimeout(() => {
        setShowCart(false);
      }, 3000);
      return () => clearTimeout(setShow);
    }
  }, [showCart, setShowCart]);
  const MENU_HEADER = [
    {
      icon: (
        <HeadsetMicIcon className="md:text-white text-black m-3"></HeadsetMicIcon>
      ),
      title: "Hotline 1800.6975",
      href: "tel:18006975",
    },
    {
      icon: (
        <LocationOnIcon className="md:text-white text-black m-3"></LocationOnIcon>
      ),
      title: "Hệ thống showroom",
      href: "/showRoom",
    },
    {
      icon: (
        <Popover
          title={
            <p className="text-green-400 font-medium">
              Thêm giỏ hàng thành công
            </p>
          }
          placement="bottom"
          trigger={"click"}
          open={showCart}
          zIndex={30}
          content={
            <div>
              <div className="flex items-center justify-center">
                <div className="border rounded-md p-1">
                  <img
                    alt="hi"
                    className="w-14 h-14 object-cover"
                    src="https://product.hstatic.net/200000722513/product/4a46d43e4b82391209328e195_large_7fa59a1a8ef14c37b78bc34161b45a87_large_3c00edfcc07d4928b682a0f675620c81_grande.png"
                  ></img>
                </div>
                <h2 className="justify-items-center ml-2">
                  Laptop gaming ASUS TUF Gaming A15 FA507NU LP034W
                </h2>
              </div>
              <a
                href={`/cart`}
                className="mt-2 p-1 w-full flex items-center justify-center rounded-md text-white bg-orange-500"
              >
                XEM GIỎ HÀNG
              </a>
            </div>
          }
          arrow={true}
        >
          <div className="relative">
            <ShoppingCartIcon className="md:text-white text-black m-3"></ShoppingCartIcon>
            <div className="w-4 h-4 font-bold text-xs flex items-center justify-center absolute top-1 right-1 rounded-full bg-yellow-400 text-black border border-spacing-1 border-white">
              {userAccount.cart ? userAccount.cart?.length : 0}
            </div>
          </div>
        </Popover>
      ),
      title: "Giỏ hàng",
      href: "/cart",
    },
  ];
  const MENU_LOGIN = [
    {
      id: 0,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 lg:m-0 m-3"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Thông tin tài khoản",
    },
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 lg:m-0 m-3"
        >
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Sổ địa chỉ",
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 lg:m-0 m-3"
        >
          <path
            fillRule="evenodd"
            d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Quản lý đơn hàng",
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 lg:m-0 m-3"
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Sản phẩm đã xem",
    },
  ];
  const [openRegister, setOpenRegister] = useState(false);
  const [expiredTime, setExpiredTime] = useState(0);
  const [openForgotPass, setOpenForgotPass] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openInputOTP, setOpenInputOTP] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);
  const [emailForgotPass, setEmailForgotPass] = useState("");
  const navigate = useNavigate();
  const handelClickTab = (id) => {
    navigate(`/settingAccount/${id}`);
  };
  return (
    <header className="bg-red-600 fixed top-0 right-0 left-0 z-2000">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="md:flex flex-1 hidden">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white mr-3"
            onClick={() => setOpenDialog(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <ProductSearch></ProductSearch>

        {MENU_HEADER.map((item, index) => (
          <Link
            to={item.href}
            key={index}
            className="max-md:hidden flex items-center justify-center cursor-pointer"
          >
            {item.icon}
            <div
              className={`h-12 max-xl:hidden font-semibold text-white leading-5 flex items-center justify-center ${
                item.title === "Giỏ hàng" ? "w-10" : "w-20"
              }`}
            >
              {item.title}
            </div>
          </Link>
        ))}
        {isLogin ? (
          <Popover
            title={`👋 Xin chào, ${userAccount.userName}`}
            placement="bottomLeft"
            trigger={"hover"}
            zIndex={30}
            content={
              <>
                <div className="border-t-2 my-2"></div>
                {MENU_LOGIN.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-start gap-x-1 py-1 hover:bg-gray-200 hover:rounded-md cursor-pointer"
                    onClick={() => handelClickTab(item.id)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </div>
                ))}
                <div className="border-t-2 my-2"></div>
                <div
                  className="flex items-center mt-2 gap-x-2"
                  onClick={() => setOpenLogout(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 lg:m-0 m-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>

                  <p className="hover:underline cursor-pointer font-medium">
                    Đăng xuất
                  </p>
                </div>
              </>
            }
          >
            <div className="max-md:hidden ml-2 flex items-center justify-center cursor-pointer bg-black-rgba p-2 rounded-md">
              <PersonIcon className="text-3xl text-white !important mr-1"></PersonIcon>
              {isLogin ? (
                <div className=" text-sm flex flex-col font-semibold text-white leading-4">
                  <span>Xin chào</span>
                  <span>{userAccount.userName}</span>
                </div>
              ) : (
                <div className="h-10 text-sm w-10 font-semibold text-white leading-4 flex items-center justify-center">
                  Đăng nhập
                </div>
              )}
            </div>
          </Popover>
        ) : (
          <Popover
            title={"👋 Xin chào vui lòng đăng nhập"}
            placement="bottomLeft"
            trigger={"click"}
            zIndex={30}
            content={
              <>
                <div className="p-2">
                  <div className="flex items-center gap-x-3">
                    <button
                      onClick={() => setOpenLogin(true)}
                      className="bg-black px-7 py-2 font-semibold text-white text-sm rounded-md"
                    >
                      ĐĂNG NHẬP
                    </button>
                    <button
                      onClick={() => setOpenRegister(true)}
                      className="bg-transparent px-7 py-2 font-semibold text-black border border-gray-700 rounded-md text-sm "
                    >
                      ĐĂNG KÝ
                    </button>
                  </div>
                </div>
                <div className="border-t-2"></div>
                <div className="flex items-center mt-2 gap-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                  <p className="hover:underline cursor-pointer font-medium">
                    Trợ giúp
                  </p>
                </div>
              </>
            }
          >
            <div className="max-md:hidden ml-2 flex items-center justify-center cursor-pointer bg-black-rgba p-1 rounded-md">
              <PersonIcon className="text-3xl text-white !important mr-1"></PersonIcon>
              <div className="h-10 text-sm w-10 font-semibold text-white leading-4 flex items-center justify-center">
                Đăng nhập
              </div>
            </div>
          </Popover>
        )}
        <ModalRegister
          open={openRegister}
          setOpen={setOpenRegister}
          setLogin={setOpenLogin}
        ></ModalRegister>

        <ModalLogin
          open={openLogin}
          setOpen={setOpenLogin}
          setRegister={setOpenRegister}
          setForgotPass={setOpenForgotPass}
        ></ModalLogin>

        <ModalForgotPassword
          open={openForgotPass}
          setOpen={setOpenForgotPass}
          setExpiredTime={setExpiredTime}
          setOpenInputOTP={setOpenInputOTP}
          setEmailForgotPass={setEmailForgotPass}
        ></ModalForgotPassword>

        <ModalInputOTP
          open={openInputOTP}
          setOpen={setOpenInputOTP}
          setOpenChangePass={setOpenChangePass}
          expiredTime={expiredTime}
          email={emailForgotPass}
        ></ModalInputOTP>

        <ModalChangePassword
          email={emailForgotPass}
          open={openChangePass}
          setOpen={setOpenChangePass}
        ></ModalChangePassword>
      </nav>

      <div
        className={`${openDialog ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10 bg-black-rgba"></div>
        <div className="fixed top-0 right-0 z-10 w-full h-auto overflow-y-auto bg-white">
          <div className="flex items-center justify-between bg-red-500 p-3">
            <a href="/" className="-m-1.5 p-1.5 ">
              <img className="h-8 w-auto" src={logo} alt="" />
            </a>
            <button
              onClick={() => setOpenDialog(false)}
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {MENU_HEADER.map((item, index) => (
                <a
                  href={item.href}
                  key={index}
                  className="cursor-pointer flex items-center hover:bg-gray-200 hover:rounded-md"
                >
                  {item.icon}
                  <div className="h-12 lg:w-20 w-full font-semibold text-gray-600 leading-5 flex items-center lg:justify-center justify-start">
                    {item.title}
                  </div>
                </a>
              ))}
            </div>
            <div className="-my-6 divide-y divide-gray-500/10 mt-4">
              {isLogin ? (
                <>
                  {MENU_LOGIN.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-start hover:bg-gray-200 hover:rounded-md cursor-pointer"
                      onClick={() => handelClickTab(item.id)}
                    >
                      {item.icon}
                      <span className="font-medium text-gray-600 ">
                        {item.title}
                      </span>
                    </div>
                  ))}
                  <div
                    className="flex items-center justify-start hover:bg-gray-200 hover:rounded-md cursor-pointer"
                    onClick={() => {
                      setOpenDialog(false);
                      setOpenLogout(true);
                    }}
                  >
                    <LogoutIcon className="w-6 h-6 lg:m-0 m-3"></LogoutIcon>
                    <span className="font-medium text-gray-600 ">
                      Đăng xuất
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex items-center cursor-pointer w-full mt-6 divide-y divide-gray-500/10 hover:bg-gray-200 hover:rounded-md"
                    onClick={() => {
                      setOpenDialog(false);
                      setOpenLogin(true);
                    }}
                  >
                    <LoginIcon className="lg:text-white text-black m-3"></LoginIcon>
                    <div className="h-12 lg:w-20 w-full font-semibold text-gray-600 leading-5 flex items-center lg:justify-center justify-start">
                      Đăng nhập
                    </div>
                  </div>
                  <div
                    className="flex items-center cursor-pointer w-full divide-y divide-gray-500/10 hover:bg-gray-200 hover:rounded-md"
                    onClick={() => {
                      setOpenDialog(false);
                      setOpenRegister(true);
                    }}
                  >
                    <AppRegistrationIcon className="lg:text-white  text-black m-3 "></AppRegistrationIcon>
                    <div className="h-12 lg:w-20 w-full font-semibold text-gray-600  leading-5 flex items-center lg:justify-center justify-start ">
                      Đăng ký
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalLogout open={openLogout} setOpen={setOpenLogout}></ModalLogout>
    </header>
  );
}

export default Header;
