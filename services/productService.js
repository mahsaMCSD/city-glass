import API_URL from "../configurations/environment";
import axios from "axios";
import { toast } from 'react-toastify';
import error_codes from "../configurations/Error-config";

export const fetchCollections = async (selectedCategory,pageNumber) => {
  let collections = null;
  let totalCount=0
  let loadingCollections=true
  try {
    await axios({
      headers: { "x-client-id": "website" },
      method: "get",
      url: `${API_URL}/products?query=${selectedCategory}&skip=${pageNumber}`,
      responseType: "stream",
    }).then((response) => {
      const data = response.data.data;
      collections = data;
      totalCount=response.data.meta.total;
      loadingCollections=false

    });
  } catch (ex) {
    toast(error_codes[ex])
  }

  return {collections,totalCount,loadingCollections};
};

export const fetchCategories = async () => {
  let categories = null;
  await axios({
    headers: { "x-client-id": "website" },
    method: "get",
    url: `${API_URL}/categories?parent=root`,
    responseType: "stream",
  }).then((response) => {
    const data = response.data.data[0].subcategories;
    categories = data;
  });
  return categories;
};
