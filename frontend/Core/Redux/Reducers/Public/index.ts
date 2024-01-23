import { AnyAction } from "redux";
import { PublicState } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState: PublicState = {
  isMobile: false,
  isLoading: false,
  layoutType: 0,
  generalSetting: {
    _id: "",
    title: "",
    en_title: "",
    phoneNumber: "",
    logo: "",
    secondaryColor: "",
    catalog: "",
    aboutUs: "",
    en_aboutUs: "",
    contactUs: "",
    en_contactUs: "",
    email: "",
    address: "",
    en_address: "",
    isActive: true,
    created_date: "",
    __v: 0,
  },
  contactUsCategories: [],
};

const publicState = (state: PublicState = initialState, action: AnyAction) => {
  let { type, payload } = action;

  switch (type) {
    case HYDRATE:
      return {
        ...state,
        ...payload.publicState,
      };

    case "SET_MOBILE":
      return {
        ...state,
        isMobile: payload,
      };
    case "LOADING_START":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADING_END":
      return {
        ...state,
        isLoading: false,
      };
    case "SET_LAYOUT_TYPE":
      return {
        ...state,
        layoutType: payload,
      };

    case "contactUsCategories":
      let data = JSON.parse(payload);
      return {
        ...state,
        contactUsCategories: data,
      };

    case "generalSetting":
      let setting = JSON.parse(payload);
      return {
        ...state,
        generalSetting: setting,
      };

    default:
      return state;
  }
};

export default publicState;
