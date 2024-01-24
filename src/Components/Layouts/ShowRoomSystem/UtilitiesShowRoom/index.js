import React from "react";
import MotorBike from "../Asset/MotorBike.svg";
import Wifi from "../Asset/wifi.svg";
import Laptop from "../Asset/Laptop.svg";
import Shield from "../Asset/Shield.svg";
import Payment from "../Asset/Payment.svg";
import Cart from "../Asset/Cart.svg";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
function UtilitiesShowRoom() {
  const ITEMS = [
    {
      icon: MotorBike,
      title: "Giữ xe miễn phí",
      isChange: false,
    },
    {
      icon: Wifi,
      title: "Wifi miễn phí",
      isChange: false,
    },
    {
      icon: Laptop,
      title: "Xem và trải nghiệm sản phẩm miễn phí",
      isChange: false,
    },
    {
      icon: QuestionAnswerIcon,
      title: "Được tư vấn chuyên sâu về sản phẩm và dịch vụ",
      isChange: true,
    },
    {
      icon: Shield,
      title: "Sản phẩm chính hãng 100%",
      isChange: false,
    },
    {
      icon: InsertInvitationIcon,
      title: "Có chính sách bán hàng trả góp",
      isChange: true,
    },
    {
      icon: Payment,
      title: "Thanh toán dễ dàng",
      isChange: false,
    },
    {
      icon: Cart,
      title: "Giao hàng tận nhà",
      isChange: false,
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col py-16">
      <h2 className="font-semibold text-4xl text-blue-950">
        CÁC TIỆN ÍCH TẠI SHOWROOM GEARVN
      </h2>
      <div
        className="flex flex-wrap flex-col gap-10 justify-center items-center mt-8"
        style={{ width: "1000px", height: "320px" }}
      >
        {ITEMS.map((item) =>
          item.isChange ? (
            <div
              key={item.title}
              className="flex items-center justify-center w-20 h-28 flex-col"
            >
              <item.icon className="text-6xl text-red-600 "></item.icon>
              <p
                className="font-bold text-center"
                style={{ width: "174px", height: "30px" }}
              >
                {item.title}
              </p>
            </div>
          ) : (
            <div
              key={item.title}
              className="flex items-center justify-center w-20 h-28 flex-col"
            >
              <img src={item.icon} className="w-16 h-16" alt=""></img>

              <p
                className="font-bold text-center"
                style={{ width: "174px", height: "30px" }}
              >
                {item.title}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default UtilitiesShowRoom;
