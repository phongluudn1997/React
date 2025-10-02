import * as React from 'react';

/**
 * Provides an easy way to manage a queue type data structure.
 * Follow the FIFO (first in, first out) principle
 */
export const useQueue = <T>(initialValue: T[] = []) => {
  const [queue, setQueue] = React.useState(initialValue);

  const add = React.useCallback((element: T) => setQueue((queue) => [...queue, element]), []);
  const remove = React.useCallback(() => {
    let removedElement;
    setQueue((queue) => {
      removedElement = queue[0];
      return queue.slice(1);
    });
    return removedElement;
  }, []);
  const clear = () => setQueue([]);

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[-1],
    size: queue.length,
    queue,
  };
};
