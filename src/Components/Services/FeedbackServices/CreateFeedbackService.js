import * as httpRequest from "../../HttpRequest/httpRequest";

export const createFeedbackService = async (data) => {
  try {
    const res = await httpRequest.post(`/public/user/feedbackProduct`, {
      ...data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
