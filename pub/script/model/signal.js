import evaluate from "./evaluate.js";

const {min} = Math;
const handlers = new WeakMap();
const signals = new Map();
const signalled = new Set();

var signalling = false;

/**
 * Signal model change, attach a signal handler to a model, or disconnect a
 * previously attached signal.
 * @param {Model|Signal} model
 * @param {function} [handler]
 * @returns {Signal}
 */
export default function signal(model, handler) {
    if (handler) return attach(model, handler);
    else if (typeof model === "symbol") disconnect(model);
    else trigger(model);
}

/**
 * Attach a signal handler.
 * @param {object} model
 * @param {function} handler
 * @returns {Signal}
 */
function attach(model, handler) {
    const signal = Symbol();

    if (!handlers.has(model)) {
        handlers.set(model, new Set());
    }

    handlers.get(model).add(handler);
    signals.set(signal, {model, handler});

    return signal;
}

/**
 * Trigger handlers for a model.
 * @param {object} model
 */
function trigger(model) {
    if (!handlers.has(model)) return;

    signalled.add(model);

    if (!signalling) {
        signalling = setTimeout(_signal, 0);
    }
}

/**
 * Disconnect signal handler.
 */
function disconnect(signal) {
    const {model, handler} = signals.get(signal);

    handlers.get(model).remove(handler);

    if (handlers.get(model).size === 0) {
        handlers.delete(model);
    }
}

/**
 * Internal rate-limited signaller.  Rate is number of handlers which will be
 * triggered per iteration.
 * @param {number} [rate]
 */
function _signal(rate=100) {
    const signals = min(rate, signalled.size);
    const values = signalled.values();

    if (!signals && signalling) {
        clearTimeout(signalling);
        signalling = false;
        return;
    }

    for (let i = 0; i < signals; i++) {
        const model = values.next().value;
        const extant = handlers.get(model) || new Set();

        signalled.delete(model);

        for (let handler of extant) {
            setTimeout(() => handler(evaluate(model)), 0);
        }
    }

    setTimeout(() => _signal(rate), 0);
}
