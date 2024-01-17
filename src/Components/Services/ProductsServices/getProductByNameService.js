import * as httpRequest from "../../HttpRequest/httpRequest";

export const getProductByName = async (name) => {
  try {
    const res = await httpRequest.get(`/public/user/product/${name}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
