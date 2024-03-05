import * as httpRequest from "../../HttpRequest/httpRequest";

export const getProductByID = async (type, id) => {
  return await httpRequest
    .get(`/public/user/product/${type}/${id}`)
    .catch((error) => {
      if (error?.response?.status !== 200 || error?.response?.status !== 201) {
        return error?.response?.data;
      }
    });
};
