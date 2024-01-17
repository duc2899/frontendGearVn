import * as httpRequest from "../../HttpRequest/httpRequest";

export const getDiscountCodeService = async () => {
  try {
    const res = await httpRequest.get(`/public/user/discountCode`);
    return res;
  } catch (error) {
    if (error?.response?.status !== 200 || error?.response?.status !== 201) {
      return error?.response?.data;
    }
    console.log(error);
  }
};
