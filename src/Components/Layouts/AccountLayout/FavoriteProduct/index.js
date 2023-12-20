import React from "react";
import priceSale from "../../../Utils/ConvertPriceSale";
import convertMoney from "../../../Utils/ConvertMoney";
function FavoriteProduct({ data }) {
  return (
    <div className="bg-white rounded-md p-4 w-3/4 max-sm:w-full">
      <h2 className="font-semibold text-2xl">Sản phẩm đã xem</h2>
      <div className="lg:grid lg:grid-cols-4 gap-4 mt-3 md:grid md:grid-cols-2 sm:grid-cols-1 max-sm:flex max-sm:flex-col max-sm:items-center">
        {data.map((item, i) => (
          <div key={i} className="cursor-pointer">
            <div className="w-4/5 h-32">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-contain hover:scale-115 overflow-hidden transition-all"
              />
            </div>
            <p className="font-medium text-sm truncate">{item.title}</p>
            <del className="text-gray-400 text-sm">
              {convertMoney(item.oldPrice)}
            </del>
            <div className="flex items-center gap-3">
              <div className=" text-red-500 text-sm font-semibold">
                {convertMoney(priceSale(item.oldPrice, item.saleRate))}
              </div>
              <div className="border text-xs font-medium border-red-500 p-0.5 bg-red-200 rounded-md text-red-500">
                {item.saleRate * 100}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteProduct;
