import { Dispatch } from "redux";
import { CustomFilterType } from "../actionTypes";

const filterActions = {
  generateParams: (data: object) => async (dispatch: Dispatch) =>
    dispatch({ type: "GENERATE_PARAMS", payload: data }),

  generateCustomFilters:
    (data: CustomFilterType) => async (dispatch: Dispatch) =>
      dispatch({ type: data.actionType, payload: data?.data }),
};

export default filterActions;
