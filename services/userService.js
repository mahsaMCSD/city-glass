import API_URL from "../configurations/environment";
import axios from "axios";

export const sendMobile = async (mobileNumber) => {
  try {
    return await axios({
      headers: { "x-client-id": "website" },
      method: "post",
      url: `${API_URL}/users`,
      responseType: "stream",
      data: { phone: `${mobileNumber}` },
    });
  } catch (ex) {}
};

