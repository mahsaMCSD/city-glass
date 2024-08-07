import API_URL from "../configurations/environment";
import axios from "axios";

export const fetchCategoriesWithEachRoot = async (selectedRoot) => {
  let catOfRoot = null;
  await axios({
    headers: { "x-client-id": "website" },
    method: "get",
    url: `${API_URL}/categories?filter_key=${selectedRoot}`,
    responseType: "stream",
  }).then((response) => {
    if (response.data.data.length !== 0) {
      const data = response.data.data[0].subcategories;
      catOfRoot = data;
    }
  });
  return catOfRoot;
};
export const fetchCategoriesSubWithFilterkey = async (catSelectedSubfk) => {
  let catSubFilterkeybaseds = null;
  await axios({
    headers: { "x-client-id": "website" },
    method: "get",
    url: `${API_URL}/categories?filter_key=${catSelectedSubfk}`,
    responseType: "stream",
  }).then((response) => {
    if (response.data.data.length !== 0) {
      const data = response.data.data[0].subcategories;
      catSubFilterkeybaseds = data;
    }
  });
  return catSubFilterkeybaseds;
};
