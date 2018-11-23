import signal from "./signal.js";

/**
 * Derive model from the property of another model.
 * @param {Model} model
 * @param {string} name
 */
export default function property(model, name) {
    let value = undefined;

    const property = {
        valueOf() {return model[name];}
    }

    signal(model, () => {
        if (value !== model[name]) {
            value = model[name];
            signal(property);
        }
    });

    return property;
}
