import { useEffect, useState } from "react";

export function useTimer(isRunning: boolean) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000); // 1s

        return () => clearInterval(interval);
    }, [isRunning]);

    return { time, setTime };
}