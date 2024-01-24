import React from "react";
import pay1 from "./Image/pay_1.webp";
import pay2 from "./Image/pay_2.webp";
import pay3 from "./Image/pay_3.webp";
import pay4 from "./Image/pay_4.webp";
import pay5 from "./Image/pay_5.webp";
import pay6 from "./Image/pay_6.webp";
import pay7 from "./Image/pay_7.webp";
import pay8 from "./Image/pay_8.webp";
import ship1 from "./Image/ship_1.webp";
import ship2 from "./Image/ship_2.webp";
import ship3 from "./Image/ship_3.webp";
import ship4 from "./Image/ship_4.webp";
import facebook from "./Image/facebook.png";
import tikTok from "./Image/tiktok.png";
import youtube from "./Image/youtube.png";
import group from "./Image/user.png";
import logoBCT from "./Image/logo-bct.webp";
function Footer(props) {
  const ICON_CONNECT_WITH_US = [
    {
      icon: facebook,
      href: "https://www.facebook.com/gearvnhcm",
    },
    {
      icon: tikTok,
      href: "https://www.tiktok.com/@gearvn.store",
    },
    {
      icon: youtube,
      href: "https://www.youtube.com/@GEARVNOficial",
    },
    {
      icon: group,
      href: "https://www.facebook.com/groups/VietnamGamingConner",
    },
  ];
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-8 p-2 py-8">
        <div className="grid grid-flow-row-dense lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-1">
            <h2 className="font-bold">VỀ GEARVN</h2>
            <div className="font-semibold text-sm">
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Giới thiệu
              </p>
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Tuyển dụng
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold">CHÍNH SÁCH</h2>
            <div className="font-semibold text-sm">
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Chính sách bảo hành
              </p>
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Chính sách thanh toán
              </p>
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Chính sách giao hàng
              </p>
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Chính sách bảo mật
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold">THÔNG TIN</h2>
            <div className="font-semibold text-sm">
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Hệ thống CỬA HÀNG
              </p>
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Trung tâm bảo hành
              </p>
              <p className="hover:text-red-400 hover:underline transition-colors cursor-pointer">
                Tra cứu địa chỉ bảo hành
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold">TỔNG ĐÀI HỖ TRỢ(MIỄN PHÍ)</h2>
            <div className="font-semibold text-sm">
              <p>
                Gọi mua:
                <a
                  href="tel:18886975"
                  className="text-blue-500 ml-2 font-semibold"
                >
                  1800.6975
                </a>{" "}
                (8:00 - 21:00)
              </p>
              <p>
                Email:
                <a
                  href="tel:18886173"
                  className="text-blue-500 ml-2 font-semibold"
                >
                  1800.6173
                </a>{" "}
                (8:00 - 21:00)
              </p>
              <p>
                CSKH:
                <a
                  href="mailto:cskh@gearvn.com"
                  className="text-blue-500 ml-2 font-semibold"
                >
                  cskh@gearvn.com
                </a>
              </p>
            </div>
          </div>
          <div className="col-span-1 ml-4">
            <div>
              <h2 className="font-bold">ĐƠN VỊ VẬN CHUYỂN</h2>
              <div className="flex items-center">
                <img
                  src={ship1}
                  alt="ship1"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={ship2}
                  alt="ship2"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={ship3}
                  alt="ship3"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={ship4}
                  alt="ship4"
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold">CÁCH THỨC THANH TOÁN</h2>
              <div className="flex items-center gap-x-2 flex-wrap">
                <img
                  src={pay1}
                  alt="pay1"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={pay2}
                  alt="pay2"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={pay3}
                  alt="pay3"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={pay4}
                  alt="pay4"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={pay5}
                  alt="pay5"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={pay6}
                  alt="pay6"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={pay7}
                  alt="pay7"
                  className="w-14 h-14 object-contain"
                />
                <img
                  src={pay8}
                  alt="pay8"
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 pt-6 flex items-center justify-between md:flex-row flex-col">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">KẾT NỐI VỚI CHÚNG TÔI</p>
            <div className="flex items-center gap-2">
              {ICON_CONNECT_WITH_US.map((item, i) => (
                <a href={item.href} key={i}>
                  <img src={item.icon} alt="hihi" className="w-8"></img>
                </a>
              ))}
            </div>
          </div>
          <img src={logoBCT} alt="" className="w-36" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
