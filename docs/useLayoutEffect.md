### Introduce
`useLayoutEffect` is a version of `useEffect` that fires before the browser repaints the screen.
Note: The code inside `useLayoutEffect` and all state updates scheduled from it block the browser from repainting the screen. When used excessively, this makes your app slow. Prefer `useEffect` 