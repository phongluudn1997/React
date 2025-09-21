import * as React from 'react';

/**
 * Client must memoize handler function. Otherwise, the effect will run again.
 * @param handler
 * @param timeout
 * @returns
 */
export const useInterval = (handler: TimerHandler, timeout?: number) => {
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>(null);

  const handleClearInterval = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  React.useEffect(() => {
    intervalRef.current = setInterval(handler, timeout);
    return handleClearInterval;
  }, [handleClearInterval, handler, timeout]);

  return handleClearInterval;
};
