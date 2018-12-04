import clean from "https://esfn.io/clean.js";

/**
 * Create a DOM listener.  Pass result to clean function to remove listener.
 * @param {HTMLElement} elem
 * @param {string} evt
 * @param {function} listener
 * @returns {Symbol}
 */
export default function listen(elem, evt, listener) {
    const symbol = Symbol();

    elem.addEventListener(evt, listener);
    clean(symbol, () => elem.removeEventListener(evt, listener));

    return symbol;
}
