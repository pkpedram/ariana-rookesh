import { Dispatch } from "redux"

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
}

export default publicActions