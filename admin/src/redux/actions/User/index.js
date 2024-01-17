import _dataManager from "../../dataManager";

const userActions = {
  setUserStatus: () => async (dispatch) => {
    await dispatch({
      type: "SET_LOGIN",
      payload: {
        isLogin: !!localStorage.getItem("access"),
        userData: JSON.parse(localStorage.getItem("userData")),
        client: JSON.parse(localStorage.getItem("client")),
      },
    });
  },
  login:
    (data = {}) =>
    async (dispatch) => {
      await _dataManager.post("login/admin", data, { dispatch }, {}, false);
    },
  logout: () => async (dispatch) => {
    localStorage.removeItem("access");
    localStorage.removeItem("userData");
    localStorage.removeItem("client");
    window.location.reload();
  },
  getUsersList:
    (data = {}, params = {}) =>
    async (dispatch) => {
      await _dataManager.get(`admin/users`, data, { dispatch, params: params });
    },
  postUser:
    (data = {}) =>
    async (dispatch) => {
      await _dataManager.post("register/admin", data, {}, {}, true, {
        success: "کاربر جدید ساخته شد",
      });
    },
  deleteUser:
    (id = "") =>
    async () => {
      await _dataManager.delete(`admin/user/${id}`, {}, {}, {}, true);
    },
  putUser:
    (data = {}, id) =>
    async () =>
      await _dataManager.put(`admin/user/${id}`, data, {}, {}, true),
};

export default userActions;
