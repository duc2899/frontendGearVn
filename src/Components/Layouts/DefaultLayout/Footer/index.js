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
function Footer(props) {
  return (
    <footer className="w-full bg-white mt-2">
      <div className="mx-auto max-w-7xl lg:px-8 p-2">
        <div className="flex flex-wrap gap-x-28 gap-y-5 justify-between -mr-6 sm: mr-0">
          <div>
            <h2 className="font-bold">VỀ GEARVN</h2>
            <div>
              <p>Giới thiệu</p>
              <p>Tuyển dụng</p>
            </div>
          </div>
          <div>
            <h2 className="font-bold">CHÍNH SÁCH</h2>
            <div>
              <p>Chính sách bảo hành</p>
              <p>Chính sách thanh toán</p>
              <p>Chính sách giao hàng</p>
              <p>Chính sách bảo mật</p>
            </div>
          </div>
          <div>
            <h2 className="font-bold">THÔNG TIN</h2>
            <div>
              <p>Hệ thống cửa hàng</p>
              <p>Trung tâm bảo hành</p>
            </div>
          </div>
          <div>
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
      </div>
    </footer>
  );
}

export default Footer;
