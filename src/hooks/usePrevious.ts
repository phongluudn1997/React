import {useEffect, useRef} from "react";

export function usePrevious(value: string) {
    const previousValue = useRef<string | null>(null);
    useEffect(() => {
        previousValue.current = value
    }, [value])

    return previousValue.current
}