import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useRef, useState } from "react";
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
  const refTextarea = useRef(null);
  const stars = Array(5).fill(0);
  const [currentStar, setCurrentStar] = useState(5);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(data);
  }, [data]);
  const handelSendFeedback = async () => {
    if (currentStar > 5 || currentStar <= 0) {
      return;
    }
    if (text.trim() === "") {
      refTextarea.current.focus();
      setError("Vui lòng nhập nhận xét của bạn");
      return;
    }
    setLoading(true);
    const res = await createFeedbackService({
      idProduct: product.id,
      idUser: idUser,
      message: text,
      star: currentStar,
    });
    if (res.status === 200) {
      setLoading(false);
      const fetchAPI = async () => {
        const res = await getProductByID(product.type, product.id);
        setData(res.data);
      };
      fetchAPI();
      toast.success("Đánh giá sản phẩm thành công");
      exitModal(false);
    } else {
      setLoading(false);
      toast.error("Không thể gửi đánh giá");
    }
  };
  return (
    <div className="fixed top-0 left-0 z-20 bg-black-rgba w-full h-full flex items-center justify-center transition ease-in-out delay-150">
      <div className="bg-white w-9/12 h-fit rounded-md flex relative animate__animated animate__fadeInDown lg:flex-row flex-col">
        <CloseIcon
          onClick={() => exitModal(false)}
          className="absolute top-2 right-2 lg:text-gray-700 text-white  w-5 h-5 cursor-pointer"
        ></CloseIcon>
        <div className="lg:w-1/3 w-full h-96 bg-red-600 flex items-center justify-center flex-col lg:rounded-tl-md lg:rounded-bl-md rounded-none">
          <img
            className="w-64 h-64 object-cover rounded-md"
            src={product.image}
            alt="art"
          />
          <p className="text-white text-center mt-2 font-semibold break-words ">
            {product.title}
          </p>
        </div>
        <div className="p-2 lg:w-2/3 w-full">
          <h2 className="flex font-semibold p-2">
            Đánh giá của bạn về:
            <p className="font-bold pl-2">{product.title}</p>
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
            <h2 className="font-semibold mb-2">Đánh giá của bạn về *:</h2>
            <textarea
              ref={refTextarea}
              id="message"
              rows="4"
              className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Nhập đánh giá của bạn về sản phẩm..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-end justify-between mt-16 mr-2">
            <button
              onClick={() => exitModal(false)}
              className="bg-gray-400 font-semibold text-white p-2 rounded-md hover:opacity-90"
            >
              Hủy
            </button>
            <button
              disabled={loading}
              onClick={handelSendFeedback}
              className="bg-red-600 font-semibold text-white p-2 rounded-md disabled:opacity-60 hover:opacity-70 transition-opacity w-32"
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Gửi đánh giá"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFeedback;
