import { AnyAction } from "redux";
import { BlogState, ProductListItem, ProductState, Publisher } from "../reducerTypes";
import { HYDRATE } from "next-redux-wrapper";

let initialState : BlogState = {
    blogList:[],
    blogInfo:{},
    blogHome:{},
    blogCategoryInfo:{}
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
                ...payload.blogState,
              };
            case 'blogCategory':
                let data = typeof payload === "string" ? JSON.parse(payload) : payload;
                return {
                    ...state,
                    blogList: data?.result
                };
            case 'blogHome':
              let dataHome = typeof payload === "string" ? JSON.parse(payload) : payload;
              return {
                  ...state,
                  blogHome: dataHome?.result
              }
            case 'blogInfo':
              let dataInfo = typeof payload === "string" ? JSON.parse(payload) : payload
              return{
                ...state,
                blogInfo:dataInfo
              }
            case 'blogCategoryInfo':
              let dataCatInfo = typeof payload === "string" ? JSON.parse(payload) : payload
              return{
                ...state,
                blogCategoryInfo:dataCatInfo?.result
              }
            default:
              return state;
          }
}


export default blogState;