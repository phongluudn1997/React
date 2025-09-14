import * as React from 'react';

const subscribe = (onStoreChange: () => void): (() => void) => {
  window.addEventListener('languagechange', onStoreChange);
  return () => window.removeEventListener('languagechange', onStoreChange);
};

const getSnapshot = () => {
  return navigator.language;
};

/**
 * `usePreferredLangague` returns a string that presents the preferred language of the user, as set in browser settings.
 */
export const usePreferredLanguage = () => {
  return React.useSyncExternalStore(subscribe, getSnapshot);
};
