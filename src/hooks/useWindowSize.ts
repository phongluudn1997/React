import * as React from 'react';

export const useWindowSize = () => {
  const subscribe = (callback: () => void) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };

  const getSnapshot = () => ({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  return React.useSyncExternalStore(subscribe, getSnapshot);
};
