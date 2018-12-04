/**
 * Wrap function so that calling without all arguments results in a partially
 * applied function.
 * @param {function} fn
 * @param {number} [argc]
 * @returns {function}
 */
export default function apply(fn, argc) {
    argc = argc === undefined ? fn.length : argc;

    return function apply(...a) {
        return a.length >= argc ? fn(...a) : (...b) => apply(...a, ...b);
    }
}
