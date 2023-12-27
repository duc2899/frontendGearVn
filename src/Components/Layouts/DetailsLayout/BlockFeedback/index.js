import React, { useState } from "react";
import starImage from "../../StoreIcons/star.png";
import _ from "lodash";
import ModalFeedback from "./ModalFeedback";
import CalculateStars from "../../../Utils/CalculateStars";
function BlockFeedback({ data }) {
  const [openFeedback, setOpenFeedback] = useState(false);

  return (
    <div className="bg-white rounded-md mt-2 flex gap-x-3 flex-col p-5">
      <h2 className="text-2xl font-semibold mb-3">
        Đánh giá & Nhận xét {data.title}
      </h2>
      <div className="flex items-center justify-center gap-x-10 lg:flex-row flex-col">
        <div className="flex items-center flex-col">
          <p className="flex text-3xl font-semibold text-red-600 items-center">
            {CalculateStars(data.stars)}/5.0
            <img src={starImage} alt="star" className="w-5 h-5 object-cover" />
          </p>
          <p>({data.dataFeedback.length}) đánh giá & nhận xét</p>
        </div>
        <div className="lg:mb-0 mb-3 mt-3">
          {data.stars.map((star, i) => (
            <div className="flex items-center gap-x-3" key={i}>
              <p className="flex items-center text-lg gap-x-2">
                {star.star}
                <img
                  src={starImage}
                  alt="star"
                  className="w-5 h-5 object-cover"
                />
              </p>
              <div
                className={`h-3 lg:w-96 w-40 rounded-md  ${
                  star.count === 0 ? "bg-gray-300" : "bg-green-500"
                }`}
              ></div>
              <div>({star.count} đánh giá)</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-2xl" id="comment">
          Nhận xét:
        </h2>
        {data.dataFeedback.map((feedback, i) => (
          <div className="mt-2">
            <div className="flex items-center gap-x-2">
              <p className="font-semibold">{feedback.name}</p>
              <span className="font-light text-gray-400">
                {feedback.createdAt}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {_.times(feedback.star, (i) => {
                  return (
                    <img
                      key={i}
                      src={starImage}
                      alt="star"
                      className="w-3 h-3 object-cover"
                    />
                  );
                })}
                <p className="ml-5">{feedback.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setOpenFeedback(true)}
        className="bg-blue-500 p-2 w-1/3 rounded-md text-white font-semibold hover:opacity-90 mt-2"
      >
        Gửi đánh giá của bạn
      </button>
      {openFeedback && (
        <ModalFeedback data={data} exitModal={setOpenFeedback}></ModalFeedback>
      )}
    </div>
  );
}

export default BlockFeedback;
