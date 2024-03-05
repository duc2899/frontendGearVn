import * as httpRequest from "../../HttpRequest/httpRequest";

export const sortPriceProductPrice = async (page, size, sort, type) => {
  try {
    const res = await httpRequest.get(`/public/user/product/sort/price`, {
      params: {
        page,
        size,
        sort,
        type,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
