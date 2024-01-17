import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { createFeedbackService } from "../../../../Services/FeedbackServices/CreateFeedbackService";
import { getProductByID } from "../../../../Services/ProductsServices/getProductByIDService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const levelStars = [
  "Rất không hài lòng",
  "Không hài lòng",
  "Bình thường",
  "Tốt",
  "Xuất sắc",
];
function ModalFeedback({ exitModal, data, idUser, setData }) {
  const stars = Array(5).fill(0);
  const [currentStar, setCurrentStar] = useState(5);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [text, setText] = useState("");

  const handelSendFeedback = async () => {
    const res = await createFeedbackService({
      idProduct: data.id,
      idUser: idUser,
      message: text,
      star: currentStar,
    });
    if (res.status === 200) {
      const fetchAPI = async () => {
        const res = await getProductByID(data.id);
        setData(res);
      };
      fetchAPI();
      toast.success("Đánh giá sản phẩm thành công");
      exitModal(false);
    } else {
      toast.error("Không thể gửi đánh giá");
    }
  };
  return (
    <div className="fixed top-0 left-0 z-20 bg-black-rgba w-full h-full flex items-center justify-center transition ease-in-out delay-150">
      <div className="bg-white w-9/12 lg:h-1/2 h-fit rounded-md flex relative animate__animated animate__fadeInDown lg:flex-row flex-col">
        <CloseIcon
          onClick={() => exitModal(false)}
          className="absolute top-2 right-2 text-gray-700 w-5 h-5 cursor-pointer"
        ></CloseIcon>
        <div className="lg:w-1/3 w-full h-full bg-red-600 flex items-center justify-center flex-col rounded-tl-md rounded-bl-md lg:rounded-none">
          <img className="w-64 h-64 object-cover" src={data.image} alt="art" />
          <p className="text-white font-semibold break-words">{data.title}</p>
        </div>
        <div className="p-2 lg:w-2/3 w-full">
          <h2 className="flex font-semibold p-2">
            Đánh giá của bạn về:
            <p className="font-bold pl-2">{data.title}</p>
          </h2>
          <div className="p-2 flex items-center gap-x-2">
            <p className="font-semibold">Mức độ đánh giá *:</p>
            {stars.map((_, index) => (
              <StarIcon
                className={`transition-all cursor-pointer ${
                  (hoverStar || currentStar) > index
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setCurrentStar(index + 1)}
                onMouseOver={() => setHoverStar(index + 1)}
                onMouseLeave={() => setHoverStar(undefined)}
                key={index}
              ></StarIcon>
            ))}
            <p>{levelStars[hoverStar - 1 || currentStar - 1]}</p>
          </div>
          <div className="p-2">
            <h2 className="font-semibold mb-2">Đánh giá của bạn về:</h2>
            <textarea
              id="message"
              rows="4"
              className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Nhập đánh giá của bạn về sản phẩm..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
          <div className="flex items-end justify-between mt-16 mr-2">
            <button
              onClick={() => exitModal(false)}
              className="bg-gray-400 font-semibold text-white p-2 rounded-md hover:opacity-90"
            >
              Hủy
            </button>
            <button
              onClick={handelSendFeedback}
              className="bg-red-600 font-semibold text-white p-2 rounded-md disabled:bg-gray-400 hover:opacity-90"
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFeedback;
