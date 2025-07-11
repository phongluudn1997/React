export const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number = 1000) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: T) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}
