import { HomeOutlined } from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import star from "../StoreIcons/star.png";
import BlockFeedback from "./BlockFeedback";
import BlockImagePreview from "./BlockImagePreview";
import CalculateStars from "../../Utils/CalculateStars";
import convertMoney from "../../Utils/ConvertMoney";
import priceSale from "../../Utils/ConvertPriceSale";
import ConvertStringToLowercase from "../../Utils/ConvertStringToLowercase";
import { getProductByID } from "../../Services/ProductsServices/getProductByIDService";
import { UserContext } from "../../Context/AccountUser";
import ModalLogin from "../DefaultLayout/Modal/ModalLogin";
import { actionCartService } from "../../Services/CartServices/ActionsCartService";
import { CartUserProvider } from "../../Context/CartUser";
function DetailLayout(props) {
  const { isLogin, userAccount, setReload } = useContext(UserContext);
  const { setShowCart } = useContext(CartUserProvider);
  const [open, setOpen] = useState(false);
  const location = window.location.pathname.split("/");
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await getProductByID(location[3]);
        setData(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAPI();
  }, [location[3]]);

  const handelAddToCart = (id) => {
    if (isLogin) {
      const fetchAPI = async () => {
        const res = await actionCartService({
          idUser: userAccount.id,
          amount: 1,
          id_product: id,
        });
        if (res.status === 200) {
          setShowCart(true);
          setReload(true);
        }
      };
      fetchAPI();
    } else {
      setOpen(true);
    }
  };
  return (
    <div className="w-full bg-gray-300 pb-3">
      <div className="mx-auto flex max-w-7xl lg:px-8 flex-col">
        <div className="flex items-center justify-start gap-x-3 mt-2">
          <Link
            to="/"
            className="text-blue-500 flex items-center font-semibold"
          >
            <HomeOutlined></HomeOutlined>
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            to={`/collections/${location[2]}`}
            className="text-blue-500 font-semibold"
          >
            {location[2]}
          </Link>
          <span>/</span>
          <span className="lg:line-clamp-none line-clamp-1 lg:w-fit w-36">
            {data.title}
          </span>
        </div>
        <div className="bg-white rounded-md mt-2 flex gap-x-3 lg:flex-row flex-col">
          {data.previewImages && (
            <BlockImagePreview
              PreviewImages={data.previewImages}
            ></BlockImagePreview>
          )}
          <div className="border-l-2 p-5 lg:w-7/12 w-full">
            <h2 className="text-2xl font-semibold">{data.title}</h2>
            <div className="flex gap-x-3 items-center">
              <div className="flex items-center">
                {data.dataFeedback && (
                  <p className="text-yellow-500 font-semibold">
                    {CalculateStars(data.dataFeedback)}
                  </p>
                )}
                <img src={star} className="w-5 h-5" alt="star" />
              </div>
              <a className="text-blue-500 cursor-pointer " href="#comment">
                Xem đánh giá
              </a>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <p className="text-2xl font-semibold text-red-600 ">
                {convertMoney(priceSale(data.oldPrice, data.saleRate))}
              </p>
              <del className="text-sm">{convertMoney(data.oldPrice)}</del>
              {data.saleRate * 100 != 0 && (
                <p className="border border-red-500 p-1 bg-red-200 w-fit rounded-md text-red-600 text-sm">
                  -{data.saleRate * 100}%
                </p>
              )}
            </div>
            <div className="mt-2">
              <div>
                {data.quantity > 0 ? (
                  <button
                    onClick={() => handelAddToCart(data.id)}
                    className={`w-2/4 bg-red-600 rounded-md p-3 text-white text-lg font-semibold hover:opacity-90 transition-all`}
                  >
                    THÊM VÀO GIỎ HÀNG
                  </button>
                ) : (
                  <button
                    disabled={!data.quantity > 0}
                    className={`w-2/4 bg-gray-400 rounded-md p-3 text-white text-lg font-semibold hover:opacity-90 transition-all`}
                  >
                    HẾT HÀNG
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3">
              <h2 className="text-xl font-semibold">Thống số kỹ thuật</h2>
              {data.properties && (
                <table className="w-full mt-3">
                  <tbody>
                    {data.properties.map((pr) => (
                      <tr key={pr.id} className="border p-4">
                        <td className="p-2 border border-gray-500 bg-gray-200 font-semibold">
                          {ConvertStringToLowercase(pr.name)}
                        </td>
                        <td className="p-2">{pr.properties}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="mt-3">
              <h2 className="text-xl font-semibold">Mô tả sản phẩm</h2>
              <div className="text-base break-words">{data.description}</div>
            </div>
          </div>
        </div>

        <div>
          {data.dataFeedback && (
            <BlockFeedback
              data={data}
              idUser={userAccount.id}
              setData={setData}
            ></BlockFeedback>
          )}
        </div>
      </div>
      <ModalLogin open={open} setOpen={setOpen}></ModalLogin>
    </div>
  );
}

export default DetailLayout;
