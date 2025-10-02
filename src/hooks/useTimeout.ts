import * as React from 'react';

/**
 * Provides a convenient way to create and manage timeouts.
 * Note that client is responsible to memo handler, otherwise the handler will trigger the restart.
 */
export const useTimeout = (handler: TimerHandler, timeout: number) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const clear = React.useCallback(() => window.clearTimeout(timeoutRef.current), []);
  React.useEffect(() => {
    timeoutRef.current = window.setTimeout(handler, timeout);
    return clear;
  }, [clear, handler, timeout]);
  return clear;
};
