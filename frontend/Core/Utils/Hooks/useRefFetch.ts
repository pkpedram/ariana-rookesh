import { RefObject,  useEffect,  useMemo, useState } from 'react'

const useRefFetch = (ref : RefObject<any>, fetcher : Function, hasMore: boolean) => {

    const [isSeen, setIsSeen] = useState(false);

    useEffect(() => {
       

            const observer = new IntersectionObserver((entries, obsrvr) => {
                const entry = entries[0];
                setIsSeen(entry.isIntersecting);
                console.log(entry.isIntersecting)
              });
              observer.observe(ref.current)
        

    }, [ref])

    useEffect(() => {
       if(isSeen && hasMore){
        fetcher()
       }
    }, [isSeen, hasMore])

}

export default useRefFetch