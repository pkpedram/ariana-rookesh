let initialState = {
    sceneList: [],
    sceneTotal: 0,
    sceneInfo: {},
    partCategoriesList: [],
    partCategoriesTotal: 0,
    partCategoryInfo: {},
    placeList: [],
    placeInfo: {},
    totalPlaces: 0,
    sceneSettings: []
}

const sceneState = (state = initialState, {type, payload, params}) => {
    switch (type) {
        case 'scene':
          return {
            ...state,
            sceneList: payload.result,
            sceneTotal: payload.count
        }
        
        case `scene/${params?.id}`:
          return{
            ...state,
            sceneInfo: payload.result
          }

        case `part-category`: 
        return {
          ...state,
          partCategoriesList: payload.result,
          partCategoriesTotal: payload.count
        }  
        case `part-category/${params?.id}`:
          return {
            ...state,
            partCategoryInfo: payload.result
          }
          case `part-categories/${params?.id}`:
            return {
              ...state,
              partCategoryInfo: payload.result
            }

        case 'place': 
        return {
          ...state,
          placeList: payload.result,
          totalPlaces: payload.count
        }    
        case `place/${params?.id}`:
          return {
            ...state,
            placeInfo: payload.result
          }

        case 'scene-setting':
          return {
            ...state,
            sceneSettings: payload.result
          }  


        default:
            return state
    }
}

export default sceneState