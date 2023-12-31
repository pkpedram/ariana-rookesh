
import _dataManager from "../dataManager";

const publicActions = {
  checkLayoutVersion: () => async (dispatch) => {
    if (window.innerWidth <= 900) {
      dispatch({ type: "SET_MOBILE", payload: true });
    } else {
      dispatch({ type: "SET_MOBILE", payload: false });
    }
    window.addEventListener(
      "resize",
      function() {
        if (window.innerWidth <= 900) {
          dispatch({ type: "SET_MOBILE", payload: true });
        } else {
          dispatch({ type: "SET_MOBILE", payload: false });
        }
      },
      true
    );
  },
  getGeneralStats: () => async dispatch => {
    await _dataManager.get('public/generalStats', {}, {dispatch})
  },
  // clientStats
  getClientStats: () => async dispatch => {
    await _dataManager.get(`public/clientStats`, {}, {dispatch})
  },

  getSeenData : (params = {}) => async dispatch => {
    await _dataManager.get('/public/seenData', {}, {dispatch, params: params})
  } ,


  //
  getNotifications: (data = {}, params = {}) => async dispatch => {
    await _dataManager.get('notification', {}, {dispatch, params: params})
  },
  // SETTINGS

  getSettings: (data = {}, params = {}) => async dispatch => {
    await _dataManager.get('setting', data, {dispatch, params: params})
  },
  getSettingInfo: (id = '') => async dispatch => {
    await _dataManager.get(`setting/${id}`, {}, {dispatch}, {id: id})
  },
  postSetting: (data = {}) => async dispatch => {
    await _dataManager.post('setting', data, {}, {}, true)
  },
  putSetting: (data = {}, id = '') => async dispatch => {
    await _dataManager.put(`setting/${id}`, data, {}, {}, true)
  },
  deleteSetting: (id = '') => async dispatch => {
    await _dataManager.delete(`setting/${id}`, {}, {}, {}, true)
  } 
};

export default publicActions;
