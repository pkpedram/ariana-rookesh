const initialState = {
  isLogin: false,
  userData: {},
  usersList: [],
  totalUsers: 0,
};

export default function userState(state = initialState, action) {
  let { type, payload, params } = action;
  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLogin: payload.isLogin,
        userData: payload.userData,
      };

    case "login/admin":
      localStorage.setItem("access", payload.token);
      localStorage.setItem("userData", JSON.stringify(payload.userData));

      return {
        ...state,
        isLogin: true,
        userData: payload.userData,
      };

    case `admin/users`:
      return {
        ...state,
        usersList: payload.result,
        totalUsers: payload.count,
      };

    default:
      return state;
  }
}
