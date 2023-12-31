

const initialState = {
  loading: false,
  isMobile: false,
  generalStats: {},
  settingsList: [],
  totalSettings: 0,
  settingInfo: {},
  seenList: [],
  notificationList: []
};


export default function publicState(state = initialState, action) {
  let { type, payload, params } = action;
  switch (type) {
    case "SET_MOBILE":
      return {
        ...state,
        isMobile: payload,
      };
   
      case 'LOADING_END':
        return{
          ...state,
          loading: false
        }  

      case 'LOADING_START':
        return{
          ...state,
          loading:true
        } 

      case 'public/generalStats':
        return {
          ...state,
          generalStats: payload
        }  

      case `public/clientStats`:
        return {
          ...state,
          generalStats: payload
        }   
        
      case '/public/seenData':
        return {
          ...state,
          seenList: payload.result
        }  
      case 'notification':
        return {
          ...state,
          notificationList: payload.result
        }  

      case `setting`: 
      return {
        ...state,
        settingsList: payload.result,
        totalSettings: payload.count
      }  
    case `setting/${params?.id}`:
      return {
        ...state,
        settingInfo: payload.result
      }

    default:
      return state;
  }
}
