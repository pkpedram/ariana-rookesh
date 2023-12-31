const initialState = {
    isLogin: false,
    userData: {},
    client: false,
    usersList: [],
    totalUsers: 0
  };
  
  
  export default function userState(state = initialState, action) {
    let { type, payload, params } = action;
    switch (type) {
      case "SET_LOGIN":
        return {
          ...state,
          isLogin: payload.isLogin,
          userData: payload.userData,
          client: payload.client,

        };
    
        case "login":
            localStorage.setItem('access', payload.token)
            localStorage.setItem('userData', JSON.stringify(payload.user))
            localStorage.setItem('client', payload.client)

            return {
                ...state,
                isLogin: true,
                client: payload.client,
                userData: payload.user
            }

      case `client/${params?.id}`:
        if(params?.client){
          localStorage.setItem('userData', JSON.stringify(payload.result))
          return {
            ...state,
            userData: payload.result
          }
        }      

      case `admin/users`:
        return {
          ...state,
          usersList: payload.result,
          totalUsers: payload.count
        }  
      
      default:
        return state;
    }
  }
  