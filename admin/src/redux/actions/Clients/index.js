import _dataManager from "../../dataManager";

const clientsActions  = {
    postClient: (data = {}) => async dispatch => {
        await _dataManager.post('client', data, {}, {}, '/clients')
    },
    getClients: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('client', data, {dispatch, params: params})
    },
    getClientInfo: (id = '') => async dispatch => {
        await _dataManager.get(`client/detail/${id}`, {}, {dispatch}, {id: id})
    },
    deleteClient: (id = null) => async dispatch => {
        await _dataManager.delete(`client/${id}`, {}, {dispatch}, {}, true)
    },
    editClient: (data = {},id = null, client = false) => async dispatch => {
        await _dataManager.put(`client/${id}`, data, {dispatch}, {client: client, id: id}, false)
    },

    // PARTS

    postPart: (data = {}) => async dispatch => {
        await _dataManager.post('part', data, {}, {}, '/parts')
    },
    getPartList: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('part', data, {dispatch, params: params})
    },
    getPartInfo: (id = '') => async dispatch => {
        await _dataManager.get(`part/${id}`, {},{dispatch}, {id: id})
    },
    putPart: (data = {}, id ='') => async dispatch => {
        await _dataManager.put(`part/${id}`, data, {dispatch}, {id: id})
    },
    deletePart: (id = '') => async dispatch => {
        await _dataManager.delete(`part/${id}`, {}, {}, {}, true)
    }
}

export default clientsActions;