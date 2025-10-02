import * as React from 'react';

/**
 * Temporarily disables scrolling on the document.
 * This can be beneficial in scenarios where you want to restrict scrolling while displaying a modal,
 * a dropdown menu, or any other component that requires the user's focus.
 */
export const useLockBodyScroll = () => {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  });
};
