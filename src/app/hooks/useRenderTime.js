import { useState, useEffect } from "react";

export const useRenderTime = (ComponentName) => {
    const [startTime] = useState(performance.now());

    useEffect(() => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(`Component ${ComponentName} rendered in ${duration} milliseconds.`);
    }, []);
}
