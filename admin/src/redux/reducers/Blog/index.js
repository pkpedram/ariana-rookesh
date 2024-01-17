const initialState = {
  postsList: [],
  postDetail: {},
  categories: [],
  totalCategories: 0,
  totalPostsList: 0,
};

export default function blogState(state = initialState, action) {
  let { type, payload, params } = action;
  switch (type) {
    case "blogPost":
      return {
        ...state,
        postsList: payload.result,
        totalPostsList: payload.count,
      };

    case "blogPost/" + params?.id:
      return {
        ...state,
        postDetail: payload.result,
        // totalPostsList: payload.count,
      };
    case "blogCategory":
      return {
        ...state,
        categories: payload.result,
        totalCategories: payload.count,
      };

    case "blogCategory/" + params?.id:
      return {
        ...state,
        categories: payload.result,
        totalCategories: payload.count,
      };

    default:
      return state;
  }
}
