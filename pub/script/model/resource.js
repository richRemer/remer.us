import signal from "./signal.js";

/**
 * Create URL resource model.
 * @param {string} url
 * @returns {Model}
 */
export default function resource(url) {
    let status = undefined;
    let body = undefined;
    let refreshing = undefined;

    const resource = {
        get status() {return status;},
        get body() {return body;},
        get refreshing() {return Boolean(refreshing)},
        get success() {return status >= 200 && status < 300;},
        get redirect() {return status >= 300 && status < 400;},
        get error() {return status >= 400;},
        get clientError() {return status >= 400 && status < 500;},
        get serverError() {return status >= 500;},

        async refresh() {
            if (!refreshing) {
                refreshing = impl();

                refreshing.catch(() => {}).then(() => {
                    if (refreshing === impl) refreshing = undefined;
                });
            }

            return refreshing;

            async function impl() {
                const res = await fetch(url);

                body = res.status < 400 ? await res.text() : undefined;
                status = res.status;

                signal(resource);
                return resource;
            }
        }
    };

    resource.refresh();
    return resource;
}
