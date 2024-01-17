import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { FilterState } from "../reducerTypes";

export type FilteringData = {
  hasMore: boolean,
  nextOffset: string,
  orderingList: string
}

const initialState: FilterState = {
    generatedParams: {

    },
    hasMore: false,
    nextOffset: '',
    orderingList: [],
    customFilters: {
      products: [
        {
          id: 1,
          title: 'تعداد ستاره',
          actionType: 'SORT_PRODUCTS_BY_STARS'
        },
        {
          id: 2,
          title: 'گران ترین',
          actionType: 'SORT_PRODUCTS_BY_EXPENSIVE'

        },
        {
          id: 3,
          title: 'ارزان ترین',
          actionType: 'SORT_PRODUCTS_BY_CHEAP'

        }
      ]
    }
};

const filterState = (state : FilterState = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {

    case HYDRATE: 
    return {
        ...state,
        ...payload.filterState
    }


    case 'SET_FILTERING_DATA': 
    let data : FilteringData = JSON.parse(payload)
    return {
      ...state,
      hasMore: data.hasMore,
      nextOffset: data.nextOffset,
      orderingList: JSON.parse(data.orderingList)
    }

    case 'everything':
      if(typeof payload !== 'string'){
        return {
          ...state,
          hasMore: payload.hasMore,
          nextOffset: payload.nextOffset,
        }
      }else{
        return state
      }

  

  case 'GENERATE_PARAMS': 
    return {
        ...state,
        generatedParams: {
            ...state.generatedParams,
            ...payload
        }
    }


    // FIRST LOAD

    case 'LOAD_PREVIOUS_DATA':
      let previousData = typeof payload === 'string' ? JSON.parse(payload) : {}
      return {
        ...state,
        nextOffset: previousData.nextOffset
      }


    default:
      return state;
  }
}


export default filterState