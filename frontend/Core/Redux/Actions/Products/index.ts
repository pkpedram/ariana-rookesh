import { Dispatch } from "redux"
import _dataManager from "../../dataManager"

const productActions = {
    getProductList: (data : object = {}, params: object = {}) => async (dispatch : Dispatch) => {
        await _dataManager.get('everything', data, {dispatch, params: params}, params, false)
    },
    clearProductList: () => (dispatch : Dispatch) => {
        dispatch({type: 'CLEAR_PRODUCT_LIST'})
    },
    loadPreviousData: () => (dispatch: Dispatch) => {
        let data = localStorage.getItem('previousData')
        if(data){
            let expire = new Date(JSON.parse(data)?.expire).getTime()
           if(expire > new Date().getTime()){
            dispatch({type: 'LOAD_PREVIOUS_DATA', payload: data})
           }
        }

    }

}

export default productActions