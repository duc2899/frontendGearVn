import * as httpRequest from "../../HttpRequest/httpRequest";

export const getAddressNoteService = async (data) => {
  try {
    const res = await httpRequest.get(`/public/user/addressNote/${data}`);
    return res;
  } catch (error) {
    if (error?.response?.status !== 200 || error?.response?.status !== 201) {
      return error?.response?.data;
    }
    console.log(error);
  }
};
