let initialState = {
    clientsList: [],
    clientsTotal: 0,
    clientInfo: {},
    partsList: [],
    partsTotal: 0,
    partInfo: {}
}

const clientsState = (state = initialState, {type, payload, params}) => {
    switch (type) {
        case 'client':
          return {
            ...state,
            clientsList: payload.result,
            clientsTotal: payload.count
          }
        case `client/detail/${payload?._id}`:
            return {
                ...state,
                clientInfo: payload
            }

        case `part`:
            return {
                ...state,
                partsList: payload.result,
                partsTotal: payload.count
            }
            
        case `part/${params?.id}`:
            return {
                ...state,
                partInfo: payload.result
            }    
        default:
            return state
    }
}

export default clientsState