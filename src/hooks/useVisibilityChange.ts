import * as React from 'react';

/**
 * Track visibility state of the document
 * @returns boolean value that indicates whether the document is visible or not.
 */
export const useVisibilityChange = () => {
  const visibilityState = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return visibilityState === 'visible';
};

const subscribe = (onStoreChange: () => void) => {
  window.document.addEventListener('visibilitychange', onStoreChange);
  return () => window.document.removeEventListener('visibilitychange', onStoreChange);
};
const getSnapshot = () => window.document.visibilityState;
const getServerSnapshot = () => {
  throw Error('useVisibilityChange is a client-only hook');
};
