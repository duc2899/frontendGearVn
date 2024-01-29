import * as httpRequest from "../../HttpRequest/httpRequest";

export const getProductByID = async (type, id) => {
  try {
    const res = await httpRequest.get(`/public/user/product/${type}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
