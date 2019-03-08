import { ENV } from '../config/env';
import { Http } from '../core/http.service';

/** Class representing the news service */
export class NewsService {
    /**
     * Returns the server response to the submitted users news request
     * @param {string} userToken The user authentication token
     * @returns {Promise<object>} The Promise object representing the server response to the submitted users news request
     */
    getNews(userToken) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/news`, {'x-access-token': userToken})
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}