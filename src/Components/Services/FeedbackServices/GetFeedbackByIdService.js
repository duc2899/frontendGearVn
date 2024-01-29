import * as httpRequest from "../../HttpRequest/httpRequest";

export const getFeedbackByIdService = async (data, page, size) => {
  try {
    const res = await httpRequest.get(`/public/user/feedbackProduct/${data}`, {
      params: {
        page,
        size,
      },
    });
    return res;
  } catch (error) {
    if (error?.response?.status !== 200 || error?.response?.status !== 201) {
      return error?.response?.data;
    }
    console.log(error);
  }
};
