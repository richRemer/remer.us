import style from "./style.js";

/**
 * Create view to hide element when value is truthy.
 * @param {HTMLElement} elem
 * @returns {View}
 */
export default function hide(elem) {
    return style(elem, "display", "none");
}
