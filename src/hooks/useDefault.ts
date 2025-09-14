import * as React from 'react';

/**
 * The useDefault hook behaves similar to `useState` but with one difference - if the state of the hook is `undefined` or `null`, `useDefault` will default the state to a provided default value.
 */
export const useDefault = <S>(initialValue: S, defaultValue: S) => {
  const [state, setState] = React.useState(initialValue);

  /**
   * state === undefined will check the value match undefined.
   * typeof state === 'undefined' also check if state is undeclared.
   */
  if (typeof state === 'undefined' || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
};
