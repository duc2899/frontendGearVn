import * as httpRequest from "../../HttpRequest/httpRequest";

export const getAllProduct = async (type, page, size) => {
  try {
    const res = await httpRequest.get(`/public/user/product/${type}`, {
      params: {
        page,
        size,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
