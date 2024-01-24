import * as httpRequest from "../../HttpRequest/httpRequest";

export const getImageBanner = async (limit) => {
  try {
    const res = await httpRequest.get(
      `/public/user/product/getImagesBanner/${limit}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
