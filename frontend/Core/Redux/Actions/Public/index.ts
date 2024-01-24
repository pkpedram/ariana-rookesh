import { Dispatch } from "redux";
import _dataManager from "../../dataManager";

const publicActions = {
  checkLayoutVersion: () => async (dispatch: Dispatch) => {
    if (window.innerWidth <= 700) {
      dispatch({ type: "SET_MOBILE", payload: true });
    } else {
      dispatch({ type: "SET_MOBILE", payload: false });
    }
    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth <= 700) {
          dispatch({ type: "SET_MOBILE", payload: true });
        } else {
          dispatch({ type: "SET_MOBILE", payload: false });
        }
      },
      true
    );
  },

  postSeen: () => async (dispatch: Dispatch) => {
    await _dataManager.post("public/seen", {}, { dispatch }, {}, false, {
      success: null,
      error: null,
    });
  },
  handleLanguege:()=> async (dispatch: Dispatch) => {
    dispatch({type:"LAN",payload:JSON.parse(localStorage.getItem("lan"))})
  },
  postContactUs:
    (data = {}) =>
    async (dispatch: Dispatch) => {
      await _dataManager.post(
        "contactUsForm",
        data,
        { dispatch },
        data,
        false,
        {
          success: "پیام شما ثبت شد. همکاران ما بزودی با شما تماس خواهند گرفت",
          error: "مشکلی در ثبت پیام پیش آمده است. لطفا بعدا دوباره امتحان کنید",
        }
      );
    },
};

export default publicActions;
