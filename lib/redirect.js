/**
 * Request handler to redirect client.
 * @param {string} target
 * @param {number} [status]
 */
function redirect(target, status=302) {
    return (req, res) => {
        res.redirect(status, target);
    };
}

module.exports = redirect;
