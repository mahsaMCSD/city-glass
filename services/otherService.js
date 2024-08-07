import React from "react";
import API_URL from "../configurations/environment";
import axios from "axios";
import {toast } from 'react-toastify';
import error_codes from "../configurations/Error-config";


export const contact = async (name,phone,cell_phone,content,department) => {  
  try {
    await axios({    
      headers: { "x-client-id": "website" },
      method: "POST",
      url: `${API_URL}/contact-us`,
      data:{name,phone,cell_phone,content,department},
      responseType: "stream",
    })
  }
  catch(ex){
    toast(error_codes[ex])

  }

};
