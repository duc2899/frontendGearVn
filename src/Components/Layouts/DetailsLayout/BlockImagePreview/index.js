import React, { useState, useRef } from "react";

function BlockImagePreview({ PreviewImages }) {
  const [resultZoom, setResultZoom] = useState(false);
  const [curImage, setCurrImage] = useState(0);

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
    <div className="p-5 lg:w-5/12 w-full">
      <div>
        <img
          className="w-fit h-fit object-cover cursor-zoom-in"
          src={PreviewImages[curImage]?.image}
          alt="helo"
          ref={imageRef}
          onMouseLeave={() => setResultZoom(false)}
          onMouseOver={() => setResultZoom(true)}
        />

        {resultZoom && (
          <div
            style={{
              backgroundImage: `url(${PreviewImages[curImage]?.image})`,
            }}
            ref={resultImageRef}
            className={`fixed w-40 h-40 border border-gray-400 translate-y-4 -translate-x-1/2 bg-no-repeat rounded-full`}
          ></div>
        )}
      </div>
      <div className="flex items-center  justify-center gap-x-3">
        {PreviewImages.map((image, index) => (
          <img
            onClick={() => setCurrImage(index)}
            className={`w-16 h-16 object-contain cursor-pointer ${
              index === curImage && "border border-red-600"
            } rounded-md`}
            src={image.image}
            key={image.id}
            alt={image.image}
          />
        ))}
      </div>
    </div>
  );
}

export default BlockImagePreview;
