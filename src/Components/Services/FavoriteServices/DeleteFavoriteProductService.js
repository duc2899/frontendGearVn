import * as httpRequest from "../../HttpRequest/httpRequest";

export const deleteFavoriteProductService = async (id) => {
  try {
    const res = await httpRequest.remove(`/public/user/favoriteProduct/${id}`);
    return res;
  } catch (error) {
    if (error?.response?.status !== 200 || error?.response?.status !== 201) {
      return error?.response?.data;
    }
    console.log(error);
  }
};
