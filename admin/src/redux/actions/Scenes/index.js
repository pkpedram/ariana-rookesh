import _dataManager from "../../dataManager"

const sceneActions = {
    getScenes: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('scene', data, {dispatch, params: params})
    },
    getSceneInfo: (id = '') => async dispatch => {
        await _dataManager.get(`scene/${id}`, {}, {dispatch}, {id: id})
    },
    deleteScene: (id = null) => async dispatch => {
        await _dataManager.delete(`scene/${id}`, {}, {dispatch}, {}, true)
    },
    editScene: (data = {}, id = '') => async dispatch => {
        await _dataManager.put(`scene/${id}`, data, {dispatch}, {id: id})
    },
    postScene: (data = {}) => async dispatch => {
        await _dataManager.post('scene', data, {}, {}, '/scenes')
    },

    // PART CATEGORIES

    getPartCategories: (data = {}, params = {}) => async dispatch => {
        await _dataManager.get('part-category', data, {dispatch, params: params}, {})
    },
    postPartCategory: (data = {}) => async dispatch => {
        await _dataManager.post('part-category', data, {dispatch}, {}, '/part-categories')
    },
    getPartCategoryInfo: (id = '') => async dispatch => {
        await _dataManager.get(`part-categories/${id}`, {}, {dispatch}, {id:id})
    },
    putPartCategory: (data = {}, id = '') => async dispatch => {
        await _dataManager.put(`part-categories/${id}`, data, {dispatch}, {id: id}, true)
    },
    deletePartCategory: (id = '') => async dispatch => {
        await _dataManager.delete(`part-categories/${id}`, {}, {}, {}, true)
    },

    // PLACES

    getPlaces: (data ={}, params = {}) => async dispatch => {
        await _dataManager.get('place', data, {dispatch, params: params})
    },
    getPlaceInfo: (id = '') => async dispatch => {
        await _dataManager.get(`place/${id}`, {}, {dispatch}, {id: id})
    },
    postPlace: (data = {}) => async dispatch => {
        await _dataManager.post('place', data, {}, {}, true)
    },
    putPlace: (data = {}, id = '') => async dispatch => {
        await _dataManager.put(`place/${id}`, data, {dispatch}, {}, true)
    },
    deletePlace: (id = '') => async dispatch => {
        await _dataManager.delete(`place/${id}`, {}, {}, {}, true)
    },

    // SCENE SETTINGS

    getSceneSettingsList: (data = {}, params = {}) => async dispatch =>{
        await _dataManager.get('scene-setting', data, {dispatch, params: params})
    },
    postSceneSettingsList: (data = {}, params = {}) => async dispatch => {
        await _dataManager.post('scene-setting', data, {})
        await _dataManager.get('scene-setting', data, {dispatch, params: params})
    },
    deleteSceneSettingsList: (id = '', params = {}) => async dispatch => {
        await _dataManager.delete(`scene-setting/${id}`, {}, {}, {}, false)
        await _dataManager.get('scene-setting', {}, {dispatch, params: params})
    }
   

}

export default sceneActions