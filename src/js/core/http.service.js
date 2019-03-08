export class Http {
    post(url, data, options) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    // modified the get method so that it can receive request headers as a parameter
    /**
     * Returns the server response to the submitted request by using the 'GET' method
     * @param {string} url The request url
     * @param {object} headers The request headers object
     * @param {object} options The request options object
     * @returns {Promise<any>} The Promise object representing the server response to the submitted request
     */
    get(url, headers, options) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET', // may be omitted - the get method is set by default
                headers: headers
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }
}
