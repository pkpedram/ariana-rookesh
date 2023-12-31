import { toast } from "react-toastify"

const findObjectValue = (object, path) => {
    let final = object
   
        path.map(
           async itm => {
               try {
                final = final[itm]
               } catch (error) {
                // toast.error('find object value error')
                // console.error(error)
                return false
               }
                // console.log(final)
            }
        )
    
    if(typeof final !== 'object'){
        return final
    }else{
        return null
    }
}

export default findObjectValue;