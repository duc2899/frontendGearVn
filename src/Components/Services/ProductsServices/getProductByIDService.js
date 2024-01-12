import * as httpRequest from "../../HttpRequest/httpRequest";

export const getProductByID = async (id) => {
  try {
    const res = await httpRequest.get(`/public/user/laptopProduct/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
