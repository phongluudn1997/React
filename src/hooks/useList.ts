import * as React from 'react';

export const useList = <T>(defaultList: T[] = []) => {
  const [list, setList] = React.useState(defaultList);

  const set = React.useCallback((newList: T[]) => {
    setList(newList);
  }, []);

  const push = React.useCallback((item: T) => {
    setList((list) => [...list, item]);
  }, []);

  const removeAt = React.useCallback((index: number) => {
    setList((list) => [...list.slice(0, index), ...list.slice(index + 1)]);
    // setList((list) => list.filter((_, i) => i !== index));
  }, []);

  const insertAt = React.useCallback((index: number, element: T) => {
    setList((list) => [...list.slice(0, index), element, ...list.slice(index)]);
  }, []);

  const updateAt = React.useCallback((index: number, element: T) => {
    setList((list) => [...list.slice(0, index), element, ...list.slice(index + 1)]);
    // setList((list) => list.map((e, i) => (i === index ? element : e)));
  }, []);

  const clear = React.useCallback(() => {
    setList([]);
  }, []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
};
