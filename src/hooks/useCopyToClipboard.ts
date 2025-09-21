import * as React from 'react';

const oldSchoolCopy = (text: string) => {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
};

export const useCopyToClipboard = () => {
  const [state, setState] = React.useState('');

  const copyToClipboard = React.useCallback((value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(value);
          setState(value);
        } else {
          throw new Error('writeText not supported');
        }
      } catch (error: unknown) {
        oldSchoolCopy(value);
        setState(value);
      }
    };
    handleCopy();
  }, []);

  return [state, copyToClipboard];
};
