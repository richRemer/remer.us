/**
 * Create proxy to wrap method calls in promises.
 * @param {object} target
 * @returns {Proxy}
 */
function asyncProxy(target) {
    return new Proxy(target, {
        get(target, prop, receiver) {
            if (typeof target[prop] === "function") {
                return (...args) => new Promise((resolve, reject) => {
                    target[prop](...args, (err, data) => {
                        if (err) reject(err);
                        else resolve(data);
                    });
                });
            } else {
                return target[prop];
            }
        }
    });
}

module.exports = asyncProxy;
