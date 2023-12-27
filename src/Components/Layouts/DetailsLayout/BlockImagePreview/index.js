import React, { useState, useRef } from "react";

function BlockImagePreview({ PrivewImages }) {
  const [resultZoom, setResultZoom] = useState(false);
  const [curImage, setCurrImage] = useState(2);

  const imageRef = useRef();
  const resultImageRef = useRef();

  imageRef.current?.addEventListener("mousemove", function (e) {
    let w = this.offsetWidth;
    let h = this.offsetHeight;
    if (resultImageRef.current) {
      resultImageRef.current.style.top = `${e.clientY}px`;
      resultImageRef.current.style.left = `${e.clientX}px`;
      let mouseWidthX = e.pageX - this.offsetLeft;
      let mouseWidthY = e.pageY - this.offsetTop;

      let percentMouseByW = (mouseWidthX / w) * 100;
      let percentMouseByH = (mouseWidthY / h) * 100;
      resultImageRef.current.style.backgroundPosition = `${percentMouseByW}% ${percentMouseByH}%`;
    }
  });
  return (
    <div className="p-5 lg:w-4/12 w-full">
      <div>
        <img
          className="w-fit h-fit object-cover cursor-zoom-in"
          src={PrivewImages[curImage].url}
          alt="helo"
          ref={imageRef}
          onMouseLeave={() => setResultZoom(false)}
          onMouseOver={() => setResultZoom(true)}
        />

        {resultZoom && (
          <div
            style={{
              backgroundImage: `url(${PrivewImages[curImage].url})`,
            }}
            ref={resultImageRef}
            className={`fixed w-40 h-40 border border-gray-400 translate-y-4 -translate-x-1/2 bg-no-repeat rounded-full`}
          ></div>
        )}
      </div>
      <div className="flex items-center lg:justify-start justify-center gap-x-3">
        {PrivewImages.map((image) => (
          <img
            onClick={() => setCurrImage(image.id)}
            className={`w-16 h-16 object-contain cursor-pointer ${
              image.id === curImage && "border border-red-600"
            } rounded-md`}
            src={image.url}
            key={image.id}
            alt={image.alt}
          />
        ))}
      </div>
    </div>
  );
}

export default BlockImagePreview;
