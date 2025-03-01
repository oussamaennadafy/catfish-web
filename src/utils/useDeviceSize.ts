import {useEffect, useState} from "react";

const useDeviceSize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => setWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = () => { 
        return (width <= 768);
    };

    return {
        isMobile,
    }
}

export default useDeviceSize