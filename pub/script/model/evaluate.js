/**
 * Evaluate model to its underlying value.  This is done by checking for a
 * .valueOf function on the model, recursively.
 * @param {Model} model
 * @returns {*}
 */
export default function evaluate(model) {
    while (wrapper(model)) {
        model = model.valueOf();
    }

    return model;
}

/**
 * Return true if the model wraps a more primitive value.
 * @param {Model} model
 * @returns {boolean}
 */
function wrapper(model) {
    return model
        && typeof model === "object"
        && typeof model.valueOf === "function"
        && model.valueOf !== Object.prototype.valueOf;
}
