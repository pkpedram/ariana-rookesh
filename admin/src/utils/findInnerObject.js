const findInnerObject = (object, path) => {
    let final = object;
    if(path.length){
        path.map((item, idx) => {
            final = final[item];
            console.log(item, final)

        }
        )
        return final
    }
}

export default findInnerObject;