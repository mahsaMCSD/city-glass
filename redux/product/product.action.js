import axios from "axios";
import API_URL from "../../configurations/environment";
import {
  SAVE_COLLECTIONS,
  SAVE_MAIN_QUERY,
  SAVE_FILTERED,
  SAVE_SEARCH_FILTERQUERY,
  CATSUB_FETCH_LOADNIG,
  FETCH_CAT_SUB_WITH_FILTERKEY,
  CLEAR_ALL_FILTERS
} from "./product.types";

export const saveFiltered = (item) => (dispatch) => {
  dispatch({
    type: SAVE_FILTERED,
    payload: item,
  });
};

export const saveMainQuery = (item) => (dispatch) => {
  dispatch({
    type: SAVE_MAIN_QUERY,
    payload: item,
  });
};
export const saveSearchFilterQuery = (item) => (dispatch) => {
  dispatch({
    type: SAVE_SEARCH_FILTERQUERY,
    payload: item,
  });
};
export const saveCollections = (item) => (dispatch) => {
  dispatch({
    type: SAVE_COLLECTIONS,
    payload: item,
  });
};
export const clearAllFilters = (item) => (dispatch) => {
  dispatch({
    type: CLEAR_ALL_FILTERS,
    payload: item,
  });
};
export const fetchCategorySubWithFilterKey = (catSelectedSubfk) => async(dispatch, getState) => {
  dispatch({ type: CATSUB_FETCH_LOADNIG, payload: true });  
  await axios({
    headers: { "x-client-id": "website" },
    method: "get",
    url: `${API_URL}/categories?filter_key=${catSelectedSubfk}`,
    responseType: "stream",
  }).then((response) => {
    if (response.data.data.length !== 0) {
      const data = response.data.data[0].subcategories;
      dispatch({ type: FETCH_CAT_SUB_WITH_FILTERKEY, payload: data });
  dispatch({ type: CATSUB_FETCH_LOADNIG, payload: false });  

    }
  });
};
