import { ENV } from '../config/env';
import { Http } from '../core/http.service';

/** Class representing the winners service */
export class WinnersService {
    /**
     * Returns the server response to the submitted request for winners
     * @param {number} part The number of the part of winners rendered (needed for rendering the  by portions while scrolling down the page)
     * @param {number} limit The number of winners rendered
     * @returns {Promise<object>} The Promise object representing the server response to the submitted request
     */
    getWinners(part, limit) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners?part=${part}&limit=${limit}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}