const initialState = {
  loading: false,
  isMobile: false,
  generalStats: {},
  settingsList: [],
  totalSettings: 0,
  settingInfo: {},
  seenList: [],
  notificationList: [],
  generalSettings: {},
  contactCategories: [],
  contactCategoriesCount: 0,
  provinces: [],
  provincesCount: 0,
  cities: [],
  citiesCount: 0,
  staticAttributes: [],
  staticAttributesCount: 0,
  sellers: [],
  sellersCount: 0,
};

export default function publicState(state = initialState, action) {
  let { type, payload, params } = action;
  switch (type) {
    case "SET_MOBILE":
      return {
        ...state,
        isMobile: payload,
      };

    case "LOADING_END":
      return {
        ...state,
        loading: false,
      };

    case "LOADING_START":
      return {
        ...state,
        loading: true,
      };

    case "public/generalStats":
      return {
        ...state,
        generalStats: payload,
      };

    case `public/clientStats`:
      return {
        ...state,
        generalStats: payload,
      };

    case "/public/seenData":
      return {
        ...state,
        seenList: payload.result,
      };
    case "notification":
      return {
        ...state,
        notificationList: payload.result,
      };

    case `setting`:
      return {
        ...state,
        settingsList: payload.result,
        totalSettings: payload.count,
      };
    case `setting/${params?.id}`:
      return {
        ...state,
        settingInfo: payload.result,
      };

    case "generalSetting":
      return {
        ...state,
        generalSettings: payload.result,
      };

    case "contactUsFormCategory":
      return {
        ...state,
        contactCategories: payload.result,
        contactCategoriesCount: payload.count,
      };

    case "province":
      return {
        ...state,
        provinces: payload.result,
        provincesCount: payload.count,
      };
    case "city":
      return {
        ...state,
        cities: payload.result,
        citiesCount: payload.count,
      };

    case "staticAttribute":
      return {
        ...state,
        staticAttributes: payload.result,
        staticAttributesCount: payload.count,
      };

    case "seller":
      return {
        ...state,
        sellers: payload.result,
        sellersCount: payload.count,
      };

    default:
      return state;
  }
}
