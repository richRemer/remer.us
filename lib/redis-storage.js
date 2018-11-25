const asyncProxy = require("./async-proxy");

/**
 * Create asynchronous storage implementation backed by Redis.
 * @param {RedisClient} redis
 * @param {string} [prefix]
 * @returns {AsyncStorage}
 */
function redisStorage(redis, prefix="") {
    const db = asyncProxy(redis);

    return {
        async getItem(key) {
            const result = await db.get(prefix+key);
            return result ? JSON.parse(result) : undefined;
        },

        async setItem(key, value) {
            return db.set(prefix+key, JSON.stringify(value));
        }
    }
}

module.exports = redisStorage;
