"use client"
import { useEffect, useState } from "react";

const useDeviceSize = () => {
    // Initialize with null to avoid errors during SSR
    const [width, setWidth] = useState<null | number>(null);

    useEffect(() => {
        // Initialize width once the component mounts (client-side only)
        setWidth(window.innerWidth);
        
        const handleWindowSizeChange = () => setWidth(window.innerWidth);
        
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = () => {
        // Return a default value if width is null (during SSR)
        if (width === null) return false;
        return (width <= 768);
    };

    return {
        isMobile,
    }
}

export default useDeviceSize