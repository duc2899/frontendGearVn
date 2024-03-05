import React, { useEffect, useState } from "react";
import { getImageBanner } from "../../../Services/ProductsServices/GetImagesBanner";
import { Carousel } from "antd";
const IMAGES = [
  {
    id: 0,
    url: "https://file.hstatic.net/200000722513/file/web_slider_800x400__2__64f8e82bae944c14aaf92ad8d1306725.png",
    alt: "iamge-1",
  },
  {
    id: 1,
    url: "https://file.hstatic.net/200000722513/file/gearvn-halloween-slider_2285934bb4714d9ea6535d4eceada4a1.jpg",
    alt: "iamge-2",
  },
  {
    id: 2,
    url: "https://file.hstatic.net/200000722513/file/gearvn-pc-gaming-slider_c93d0e6bd9e547b8922314571e1d3ef2.jpg",
    alt: "iamge-3",
  },
  {
    id: 3,
    url: "https://file.hstatic.net/200000722513/file/gearvn-man-hinh-slider_eaff9f7f61cc4f5e953239b3e3a608a9.jpg",
    alt: "iamge-4",
  },
  {
    id: 4,
    url: "https://file.hstatic.net/200000722513/file/gearvn-mua-kem-pc-laptop-slider_f1a31ee0614d479d995b45fe48d06344.jpg",
    alt: "iamge-5",
  },
];
function BannerLayout(props) {
  // const [dataImage, setDataImage] = useState([]);
  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     const res = await getImageBanner(5);
  //     setDataImage(res);
  //   };
  //   // fetchAPI()
  // }, []);

  return (
    <div className="basis-auto sm">
      <div className="grid grid-cols-3 gap-y-3">
        <div className="col-span-3 lg:col-span-2">
          <Carousel autoplay>
            {IMAGES.map((image) => (
              <img
                key={image.id}
                src={image.url}
                className="rounded-md w-full object-contain h-auto"
                alt={image.alt}
              />
            ))}
          </Carousel>
        </div>
        <div className="row-span-1 lg:flex lg:justify-around lg:gap-2 lg:flex-col hidden pl-3">
          <img
            className="rounded-lg"
            src="https://file.hstatic.net/200000722513/file/gearvn-dai-tiec-rog-san-qua-toi-tuf-slider_47335ea3529147b2a278a1975f2989b0.jpg"
            alt="ki"
          />
          <img
            className="rounded-lg "
            src="https://hacom.vn/media/lib/01-02-2021/0201-tintuc.png"
            alt="ki"
          />
        </div>
        <div className="flex items-center gap-1">
          <img
            className=" rounded-lg"
            src="https://static.ladipage.net/5bf3dc7edc60303c34e4991f/landing-page-final-10-20220601093805.png"
            alt="ki"
          />
          <img
            className=" rounded-lg"
            src="https://file.hstatic.net/1000026716/file/gearvn-laptop-gaming-msi-katana-gf66-12uc-699vn-8_8bf0347aaf054db4b7f9b667494f6f34_1024x1024.jpg"
            alt="ki"
          />
          <img
            className="rounded-lg"
            src="https://file.hstatic.net/1000026716/file/gearvn-laptop-gaming-msi-katana-gf66-12uc-699vn-8_8bf0347aaf054db4b7f9b667494f6f34_1024x1024.jpg"
            alt="ki"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerLayout;
