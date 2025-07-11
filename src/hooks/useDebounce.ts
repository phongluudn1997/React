import { useRef } from "react";

export const useDebounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number = 1000
) => {
  // Store timerId in the ref - persisted between re-render of Component - If the callback is called the next re-render (by some reasons - other state update) still get the timerId to reset.
  const timerId = useRef<ReturnType<typeof setTimeout>>(null);

  // If component re-renders during the waiting time by any reason (other state update) - the returned function will use the old state / props because React call the Parent function to re-render -> Stale closures
  const callbackRef = useRef(func);
  return function (...args: T) {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => callbackRef.current(...args), delay);
  };
};
