/**
 * Create view to set style when value is truthy.
 * @param {HTMLElement} elem
 * @param {string} name
 * @param {string} value
 * @returns {View}
 */
export default function style(elem, name, value) {
    return active => {
        if (active) elem.style[name] = value;
        else elem.style.removeProperty(name);
    };
}
