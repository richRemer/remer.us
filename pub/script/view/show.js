import style from "./style.js";

/**
 * Create view to show element when value is truthy.
 * @param {HTMLElement} elem
 * @returns {View}
 */
export default function show(elem) {
    const display = elem.dataset.display || "initial";
    return style(elem, "display", display);
}
