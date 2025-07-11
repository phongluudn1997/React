import {useEffect, useState} from "react";

/**
 * Since count is a reactive value, it must be specified in the list of dependencies. However, that causes the Effect to cleanup and setup again every time the count changes. This is not ideal.
 * To fix this, pass the c => c + 1 state updater to setCount:
 */
export const useCounter = () => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((counter) => counter + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return {counter}
}
