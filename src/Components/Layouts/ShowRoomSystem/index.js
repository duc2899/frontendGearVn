import React, { useState } from "react";
import HeaderShowRoom from "./HeaderShowRoom";
import BodyShowRoom from "./BodyShowRoom";
import img1 from "./Asset/img1.jpg";
import img2 from "./Asset/img2.jpg";
import img3 from "./Asset/img3.jpg";
import HoangHoaTham from "./Asset/HoangHoaTham.png";
import KhavanCan from "./Asset/KhaVanCan.png";
import TranHungDao from "./Asset/TranHungDao.png";
import ThaiHa from "./Asset/bannerNorthArea.png";
import { useEffect } from "react";
function ShowRoomSystem() {
  const data = [
    {
      title: "KHU VỰC MIỀN NAM",
      showRooms: [
        {
          name: "HOÀNG HOA THÁM",
          address: "78-80-82 Hoàng Hoa Thám, Phường 12, Quận Tân Bình",
          timeWork: "Thời gian làm việc: 8:00 - 21:00 | Thứ 2 - Chủ Nhật",
          fanPage: "Truy cập Fanpage GEARVN Hoàng Hoa Thám",
          linkIframe:
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7838.32299882889!2d106.64744600000002!3d10.79894!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294a0c97a181%3A0x6aece518177f9a92!2sGEARVN%2078-80-82%20Ho%C3%A0ng%20Hoa%20Th%C3%A1m!5e0!3m2!1svi!2sus!4v1705927848432!5m2!1svi!2sus",
          dataImage: [img1, img2, img3],
          banner: HoangHoaTham,
        },
        {
          name: "KHA VẠN CÂN",
          address: "905 Kha Vạn Cân, Phường Linh Tây, TP. Thủ Đức",
          timeWork: "Thời gian làm việc: 8:00 - 21:00 | Thứ 2 - Chủ Nhật",
          fanPage: "Truy cập Fanpage GEARVN KHA VẠN CÂN",
          linkIframe:
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7836.743024011859!2d106.75941!3d10.859322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527dfdb9a969d%3A0x2733db35aa4da8ff!2zR2VhcnZuIDkwNSBLaGEgVuG6oW4gQ8Oibg!5e0!3m2!1svi!2sus!4v1705928147039!5m2!1svi!2sus",
          dataImage: [img1, img2, img3],
          banner: KhavanCan,
        },
        {
          name: "TRẦN HƯNG ĐẠO",
          address: "1081 - 1083 Trần Hưng Đạo, Phường 5, Quận 5",
          timeWork: "Thời gian làm việc: 8:00 - 21:00 | Thứ 2 - Chủ Nhật",
          fanPage: "Truy cập Fanpage GEARVN Trần Hưng Đạo",
          linkIframe:
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7839.511530957818!2d106.674119!3d10.753297!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1af0e7aaa9%3A0x6f3b3d55ddbb4754!2zR0VBUlZOIFRy4bqnbiBIxrBuZyDEkOG6oW8!5e0!3m2!1svi!2sus!4v1705928220846!5m2!1svi!2sus",
          dataImage: [img1, img2, img3],
          banner: TranHungDao,
        },
      ],
    },
    {
      title: "KHU VỰC MIỀN BẮC",
      showRooms: [
        {
          name: "THÁI HÀ",
          address: "162 - 164 Thái Hà, Phường Trung Liệt, Đống Đa, Hà Nội.",
          timeWork: "Thời gian làm việc: 8:00 - 21:00 | Thứ 2 - Chủ Nhật",
          fanPage: "Truy cập Fanpage GEARVN Thái Hà",
          linkIframe:
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7449.000133322694!2d105.82053!3d21.012668!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abd7a4041695%3A0xa594770e41494bdb!2sGearvn!5e0!3m2!1svi!2sus!4v1705936352124!5m2!1svi!2sus",
          dataImage: [img1, img2, img3],
          banner: ThaiHa,
        },
      ],
    },
  ];
  const [choose, setChoose] = useState("");
  useEffect(() => {
    if (choose) {
      window.scrollTo(0, 820);
    }
  }, [choose]);
  return (
    <div className="overflow-hidden">
      <HeaderShowRoom setChoose={setChoose}></HeaderShowRoom>
      {choose ? (
        <>
          <BodyShowRoom Data={data[choose - 1]}></BodyShowRoom>
          <div className="h-1 w-full bg-blue-950"></div>
        </>
      ) : (
        <div className="h-1 w-full bg-blue-950"></div>
      )}
    </div>
  );
}

export default ShowRoomSystem;
