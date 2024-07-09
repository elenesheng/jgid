import { useState, useEffect } from 'react';
import { MILLISECONDS_IN_A_SECOND } from '../lib/constants';

const useTimer = (initialTimeInSeconds: number, isRunning: boolean) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTimeInSeconds);
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
    const [referenceDate, setReferenceDate] = useState<number>(Math.floor(Date.now() / MILLISECONDS_IN_A_SECOND));

    useEffect(() => {
        if (!isRunning) return;
        setReferenceDate(Math.floor(Date.now() / MILLISECONDS_IN_A_SECOND));

        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / MILLISECONDS_IN_A_SECOND);
            const elapsed = now - referenceDate;
            const newTimeLeft = timeLeft - elapsed;

            if (newTimeLeft <= 0) {
                clearInterval(interval);
                setIsTimeUp(true);
                setTimeLeft(0);
            } else {
                setTimeLeft(newTimeLeft);
                setReferenceDate(now);
            }
        }, MILLISECONDS_IN_A_SECOND);

        return () => clearInterval(interval);
    }, [isRunning, referenceDate, timeLeft]);

    useEffect(() => {
        setTimeLeft(initialTimeInSeconds);
        setReferenceDate(Math.floor(Date.now() / MILLISECONDS_IN_A_SECOND));
    }, [initialTimeInSeconds, isRunning]);

    return { timeLeft, isTimeUp, setIsTimeUp, setTimeLeft };
};

export default useTimer;
