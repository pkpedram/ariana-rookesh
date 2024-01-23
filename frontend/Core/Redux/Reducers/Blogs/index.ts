import { AnyAction } from "redux";
import { BlogState, ProductListItem, ProductState, Publisher } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState : BlogState = {
    blogList:[],
    blogInfo:{},
}

const blogState  = (
    state:BlogState = initialState,
    action: AnyAction)=>{
        let { type, payload, params } = action;
        switch (type) {
            // HYDRATING SERVERSIDE STATE TO CLIENT SIDE STATE
            case HYDRATE:
              return {
                ...state,
                ...payload.productState,
              };
            case 'blogCategory':
                let data = typeof payload === "string" ? JSON.parse(payload) : payload;
                return {
                    ...state,
                    blogList: data?.result
                }

            default:
              return state;
          }
}


export default blogState;