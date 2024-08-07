import {
  INCREMENT_PAGENUMBER,
} from "./pagination.types";
export const pagenumberIncrement = () => (dispatch, getState) => {
  return {
    type: INCREMENT_PAGENUMBER
  }
};

