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

    const sm = () => {
        // Return a default value if width is null (during SSR)
        if (width === null) return false;
        return width >= 640; // sm breakpoint (40rem)
    };

    const md = () => {
        // Return a default value if width is null (during SSR)
        if (width === null) return false;
        return width >= 768; // md breakpoint (48rem)
    };

    const lg = () => {
        // Return a default value if width is null (during SSR)
        if (width === null) return false;
        return width >= 1024; // lg breakpoint (64rem)
    };

    const xl = () => {
        // Return a default value if width is null (during SSR)
        if (width === null) return false;
        return width >= 1280; // xl breakpoint (80rem)
    };

    const xxl = () => {
        // Return a default value if width is null (during SSR)
        if (width === null) return false;
        return width >= 1536; // 2xl breakpoint (96rem)
    };

    return {
        sm,
        md,
        lg,
        xl,
        xxl,
        width
    }
}

export default useDeviceSize