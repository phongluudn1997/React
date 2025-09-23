import * as React from 'react';

type UseCounterOptions = {
  initialCountValue?: number;
  options?: {
    min?: number;
    max?: number;
    step?: number;
  };
};

export const useCounter = ({ initialCountValue = 0, options = {} }: UseCounterOptions) => {
  const [counter, setCounter] = React.useState<number>(initialCountValue);
  const { max, min, step = 1 } = options;

  if (min && initialCountValue < min) {
    throw new Error(`Invalid settings. InitialValue ${initialCountValue} is less than min ${min}.`);
  }

  if (max && initialCountValue > max) {
    throw new Error(
      `Invalid settings. InitialValue ${initialCountValue} is greater than max ${max}`,
    );
  }

  const increment = React.useCallback(
    () =>
      setCounter((counter) => {
        const newMax = counter + step;
        return max ? (newMax <= max ? newMax : counter) : newMax;
      }),
    [max, step],
  );

  const decrement = React.useCallback(() => {
    setCounter((counter) => {
      const newMin = counter - step;
      return min ? (newMin >= min ? newMin : counter) : newMin;
    });
  }, [min, step]);

  const set = React.useCallback(
    (newCounter: number) =>
      setCounter((counter) => {
        const isValid = max ? newCounter <= max : min ? newCounter >= min : true;
        return isValid ? newCounter : counter;
      }),
    [max, min],
  );

  const reset = React.useCallback(() => setCounter(initialCountValue), [initialCountValue]);

  return [counter, { increment, decrement, set, reset }];
};
