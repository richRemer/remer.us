import listen from "./listen.js";

/**
 * Attach click handler to element.  Pass the return value to the clean function
 * to remove the handler.
 * @param {HTMLElement} elem
 * @param {function} handler
 * @returns {Symbol}
 */
export default function click(elem, handler) {
    return listen(elem, "click", () => handler());
}
