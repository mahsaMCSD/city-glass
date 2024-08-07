import {
  SAVE_MAIN_QUERY,
  SAVE_COLLECTIONS,
  SAVE_FILTERED,
  COLLECTION_FETCH_LOADNIG,
  SAVE_SEARCH_FILTERQUERY,
  CATSUB_FETCH_LOADNIG,
  FETCH_CAT_SUB_WITH_FILTERKEY,
  CLEAR_ALL_FILTERS
} from "./product.types";

const INITIAL_STATE = {
  mainQuery: "",
  searchFilterQuery: "",
  collections: [],
  menuFiltered: null,
  defaultActiveKeyRoot: "",
  defaultActiveKeySecond: "",
  loading: true,
  catSubLoading:true,
  mainCatSubFilterKeyBased:[],
};
const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_FILTERED:
      return {
        ...state,
        menuFiltered: action.payload,
      };
    case SAVE_SEARCH_FILTERQUERY:
      return {
        ...state,
        searchFilterQuery: action.payload,
      };

    case SAVE_MAIN_QUERY:
      return {
        ...state,
        mainQuery: action.payload,
      };
    case SAVE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    case COLLECTION_FETCH_LOADNIG:
      return {
        ...state,
        loading: action.payload,
      };
    case CATSUB_FETCH_LOADNIG:
      return {
        ...state,
        catSubLoading: action.payload,
      };
    case FETCH_CAT_SUB_WITH_FILTERKEY:
      return {
        ...state,
        mainCatSubFilterKeyBased: action.payload,
      };
    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        mainQuery: "",
        searchFilterQuery: "",
        menuFiltered: null,
        defaultActiveKeyRoot: "",
        collections:[]
      };

    default:
      return state;
  }
};

export default productReducer;
