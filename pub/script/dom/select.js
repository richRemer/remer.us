/**
 * Select elements using CSS-like syntax and pass each selected element to a
 * callback or return the elements.
 * @param {HTMLDocument|HTMLElement} context
 * @param {string} selector
 * @param {function} [fn]
 * @returns {HTMLElement[]|undefined}
 */
export default function select(context, selector, fn) {
    const selected = Array.from(context.querySelectorAll(selector));
    return fn ? selected.forEach(fn) : selected;
}

/**
 * Select one element using CSS-like syntax and pass the selected element to a
 * callbck or return the element.  If nothing is selected, the callback will not
 * be executed.
 * @param {HTMLDocument|HTMLElement} context
 * @param {string} selector
 * @param {function} [fn]
 * @returns {HTMLElement|undefined}
 */
export function one(context, selector, fn) {
    const selected = context.querySelector(selector);
    return fn && selected ? fn(selected) : selected;
}
