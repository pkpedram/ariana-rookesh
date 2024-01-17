let initialState = {
  categories: [],
  categoriesCount: 0,
  productList: [],
  productListCount: 0,
  productDetail: {},
};

export default function productState(state = initialState, action) {
  let { type, payload, params } = action;
  switch (type) {
    case "category":
      return {
        ...state,
        categories: payload.result,
        categoriesCount: payload.count,
      };
    case "product":
      return {
        ...state,
        productList: payload.result,
        productListCount: payload.count,
      };

    case "product/" + params?.id:
      return {
        ...state,
        productDetail: payload.result,
      };
    default:
      return state;
  }
}
