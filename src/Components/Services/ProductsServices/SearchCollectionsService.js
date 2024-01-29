import * as httpRequest from "../../HttpRequest/httpRequest";

export const searchCollectionService = async (type, page, size, data) => {
  try {
    const res = await httpRequest.post(
      `/public/user/product/search/${type}`,
      {
        ...data,
      },
      {
        params: {
          page,
          size,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
