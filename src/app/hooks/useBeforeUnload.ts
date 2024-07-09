
"use client";

import { useEffect } from 'react';

const useBeforeUnload = (handler: () => void, isRunning: boolean) => {
    useEffect(() => {
        const listener = (event: BeforeUnloadEvent) => {
            if (isRunning) {
                handler();
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', listener);

        return () => {
            window.removeEventListener('beforeunload', listener);
        };
    }, [handler, isRunning]);
};

export default useBeforeUnload;
