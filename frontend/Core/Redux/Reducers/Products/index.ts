import { AnyAction } from "redux";
import { ProductListItem, ProductState, Publisher } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState: ProductState = {
  productInfo: {},
  productList: [],
  relatedProductsList: [],
  filteredProducts: [],
  ordering: "1",
  firstTimeFetching: false,
  publisherList: [],
  categories: [],
  categoryInfo: {
    __v: 0,
    _id: "",
    banner: "",
    catalog: "",
    created_date: "",
    en_name: "",
    icon: "",
    isActive: true,
    name: "",
    showOnHomePage: false,
    showProductPrices: true,
    slug: "",
  },
  productAtts: [],
  productImages: [],
  productStaticAtts: [],
  productSellers: [],
};

const productState = (
  state: ProductState = initialState,
  action: AnyAction
) => {
  let { type, payload, params } = action;

  switch (type) {
    // HYDRATING SERVERSIDE STATE TO CLIENT SIDE STATE
    case HYDRATE:
      return {
        ...state,
        ...payload.productState,
      };

    case "category":
      let data = typeof payload === "string" ? JSON.parse(payload) : payload;

      return {
        ...state,
        categories: data?.result,
      };

    case "categoryInfo":
      let infoData =
        typeof payload === "string" ? JSON.parse(payload) : payload;

      return {
        ...state,
        categoryInfo: infoData,
      };

    case "productList":
      let productListData =
        typeof payload === "string" ? JSON.parse(payload) : payload;

      return {
        ...state,
        productList: productListData.result,
      };
    case "productInfo":
      let pIdata = typeof payload === "string" ? JSON.parse(payload) : payload;

      return {
        ...state,
        productInfo: pIdata,
      };

    case "productImages":
      let pImages = typeof payload === "string" ? JSON.parse(payload) : payload;
      return {
        ...state,
        productImages: pImages.result,
      };

    case "productStaticAtts":
      let pSAData = typeof payload === "string" ? JSON.parse(payload) : payload;

      return {
        ...state,
        productStaticAtts: pSAData.result,
      };
    case "productAtts":
      let paData = typeof payload === "string" ? JSON.parse(payload) : payload;
      return {
        ...state,
        productAtts: paData.result,
      };
    case "productSeller":
      let psData = typeof payload === "string" ? JSON.parse(payload) : payload;
      return {
        ...state,
        productSellers: psData.result,
      };
    default:
      return state;
  }
};

export default productState;
