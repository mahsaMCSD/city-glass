import React from "react";
import API_URL from "../configurations/environment";
import axios from "axios";
import error_codes from "../configurations/Error-config";
import {toast } from 'react-toastify';


export const fetchProductDetail = async (productId) => {
  let loading=true
  let productDetail = null;

  try {
    await axios({
    
      headers: { "x-client-id": "website" },
      method: "get",
      url: `${API_URL}/products/${productId}`,
      responseType: "stream",
    }).then((response) => {
      loading=false
      const data = response.data.data;
      productDetail = data;
    });
  }
  catch(ex){
    toast(error_codes[ex])

  }

 
  return productDetail;
};
