import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
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
  const [slide, setSlide] = useState(0);
  const nextImage = () => {
    setSlide(IMAGES.length - 1 === slide ? 0 : slide + 1);
  };
  const prevImage = () => {
    setSlide(slide === 0 ? IMAGES.length - 1 : slide - 1);
  };
  useEffect(() => {
    const loop = setInterval(() => {
      setSlide(IMAGES.length - 1 === slide ? 0 : slide + 1);
    }, 3000);
    return () => clearInterval(loop);
  }, [slide]);

  return (
    <div className="basis-auto sm mt-3">
      <div className="grid grid-cols-3 gap-y-3">
        <div className="flex overflow-hidden relative col-span-3 lg:col-span-2">
          <KeyboardArrowLeftIcon
            onClick={prevImage}
            className="text-red-600 absolute top-1/2 left-2 w-10 h-10 cursor-pointer -translate-y-1/2 "
          ></KeyboardArrowLeftIcon>
          {IMAGES.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className={`transition-all rounded-lg ${
                image.id === slide ? "block w-full object-cover" : "hidden"
              }`}
            />
          ))}
          <span className="absolute bottom-2 flex gap-5 left-1/2 -translate-x-1/2">
            {IMAGES.map((item) => (
              <button
                key={item.id}
                className={`block transition-all rounded-sm space-x-2 h-1 text-transparent lg:w-9 w-2 ${
                  item.id === slide ? "bg-red-600" : "bg-gray-500"
                }`}
              >
                {item.id}
              </button>
            ))}
          </span>
          <KeyboardArrowRightIcon
            className="text-red-600 absolute top-1/2 right-2 w-10 h-10 cursor-pointer -translate-y-1/2"
            onClick={nextImage}
          ></KeyboardArrowRightIcon>
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
