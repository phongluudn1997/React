import { useEffect, useRef } from "react";

/**
 * Debounce a value
 */
const useDebounceValue = (value: any, delay: number = 1000) => {
  // Keep timerId in ref so the next re-render (by any reason) the Component still can have reference to timerid to clearTimeout
  const timerId = useRef<ReturnType<typeof setTimeout>>(null);

  // We can useState here - force component re-render to get the up-to-date value of DebouncedValue.
  // If we don't use that debouncedValue for UI, we can keep it in ref to avoid extra re-render.
  const debouncedValue = useRef(null);

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      debouncedValue.current = value;
    }, delay);
  }, [value, delay]);

  return { value: debouncedValue.current };
};
