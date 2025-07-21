/**
 * A utility to fake network called after ms millisecond.
 * @param ms
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}