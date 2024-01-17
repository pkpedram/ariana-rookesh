import { useEffect, useState } from "react";

const useConnect = () =>{
    const [isOnline, setNetwork] = useState(true);
    useEffect(() => {
    window.addEventListener("offline", 
            () => setNetwork(window.navigator.onLine)
          );
    window.addEventListener("online", 
            () => setNetwork(window.navigator.onLine)
          );
    });
    return isOnline;
    };

export default useConnect    