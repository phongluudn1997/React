/**
 * Throttle
 * e.g. A `movemouse` event can trigger some expensive callback and we just want to execute them EVERY ~100ms
 * Unlike debounce, throttle will always execute the callback after a period of time AGAIN AND AGAIN
 * While debounce will only execute ONCE after the delay
 *
 * TODO: The last callback will not be executed. Re-work on this
 */
export const throttle = <T extends unknown[]>(func: (...args: T) => void, delay: number = 1000) => {
    let shouldWait: boolean = false
    return (...args: T) => {
        // 3. Avoid doing things
        if (shouldWait) return;
        // 1. Execute the callback right away
        func(...args)
        shouldWait = false;
        // 2. If the next callback executed less than `delay`, we avoid executing
        setTimeout(() => {
            // 4. After `delay`, we allow to be called again.
            shouldWait = false
        }, delay)
    }
}