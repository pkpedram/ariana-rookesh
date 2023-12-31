import _dataManager from "../../dataManager"

const userActions = {
    setUserStatus: () => async dispatch => {
        await dispatch({type: 'SET_LOGIN', payload: {
            isLogin : !!localStorage.getItem('access'),
            userData: JSON.parse(localStorage.getItem('userData')),
            client: JSON.parse(localStorage.getItem('client'))

        }})
    },
    login: (data = {}) => async dispatch => {
        await _dataManager.post('login', data, {dispatch}, {}, false)
    },
    logout: () => async dispatch => {
        localStorage.removeItem('access')
        localStorage.removeItem('userData')
        localStorage.removeItem('client')
        window.location.reload()
    },
    getUsersList: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get(`admin/users`, data , {dispatch, params: params})
    }
}

export default userActions