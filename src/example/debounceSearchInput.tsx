import {type ChangeEvent, useEffect, useRef, useState} from "react";
import {usePrevious} from "../hooks/usePrevious.ts";

const useDebounceValue = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState("")
    const timerId = useRef<number | null>(null)

    useEffect(() => {
        if (timerId.current) {
            clearTimeout(timerId.current)
        }
        timerId.current = setTimeout(() => setDebouncedValue(value), delay)
    }, [delay, value])

    return debouncedValue
}

export const DebouncedSearchInput = () => {
    const [query, setQuery] = useState("")
    const previousQuery = usePrevious(query)
    // const debouncedQuery = useDebounceValue(query, 1000)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return <>
        <input type="text" value={query} onChange={handleChange}/>
        <br/>
        {/*<span>Debounced value: {debouncedQuery}</span>*/}
        <br/>
        <span>Previous value: {previousQuery}</span>
    </>
}