import { AnyAction } from "redux";
import { ProductListItem, ProductState, Publisher } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState: ProductState = {
  productInfo: {
    canonicalId: 0,
    description: "",
    authors: [],
    hasPhysicalEdition: false,
    htmlDescription: "",
    id: 0,
    numberOfPages: 0,
    price: 0,
    PublisherID: 0,
    publisherSlug: "",
    rateDetails: [],
    rates: [],
    rating: 0,
    sourceBookId: 0,
    sticker: "",
    title: "",
    types: [],
    beforeOffPrice: 0,
    categories: [],
    coverUri: "",
    currencyBeforeOffPrice: 0,
    currencyPrice: 0,
    destination: 0,
    encrypted: false,
    files: [],
    ISBN: "",
    isRtl: false,
    labels: [],
    offText: "",
    physicalBeforeOffPrice: 0,
    PhysicalPrice: 0,
    priceColor: "",
    publishDate: "",
    publisher: "",
    shareText: "",
    shareUri: "",
    showOverlay: false,
    state: 1,
    subscriptionAvailable: false,
    subtitle: "",
    type: "",
  },
  productList: [],
  relatedProductsList: [],
  filteredProducts: [],
  ordering: "1",
  firstTimeFetching: false,
  publisherList: [],
  categories: [],
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
    default:
      return state;
  }
};

export default productState;
