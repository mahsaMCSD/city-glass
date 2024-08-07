import {
  INCREMENT_PAGENUMBER,
  CLEAR_PAGENUMBER
} from "./pagination.types";
const initialState = { pageNumber: 0 };
const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_PAGENUMBER:
      return {         
        pageNumber: state.pageNumber + 50      
      }; 
    case CLEAR_PAGENUMBER:
      return {
        ...state,
        pageNumber:0
      }
      
    default:
      return state;
  }
};
export default paginationReducer;
