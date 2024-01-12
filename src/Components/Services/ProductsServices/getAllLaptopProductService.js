import * as httpRequest from "../../HttpRequest/httpRequest";

export const getAllLaptopProduct = async (page, size) => {
  try {
    const res = await httpRequest.get("/public/user/laptopProduct", {
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
