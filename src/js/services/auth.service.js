import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class AuthService {
    get userId() {
        return localStorage.getItem('sn_user_id');
    }

    get token() {
        return localStorage.getItem('sn_user_token');
    }

    get isSubscribed() {
        return false;
    }

    login(email, password) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/login`, {email, password})
                .then((response) => {
                    if (!response.auth) return reject(response); 
                    localStorage.setItem('sn_user_id', response.id);
                    localStorage.setItem('sn_user_token', response.token);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }

    logout() {
        // use promise to mimic async logout functionality
        return new Promise((resolve, reject) => {
            localStorage.removeItem('sn_user_id');
            localStorage.removeItem('sn_user_token');
            resolve();
        });
    }

    /**
     * Returns the server response to the submitted signup form
     * @param {Object} userData The user data provided to the signup form
     * @returns {Promise<any>} The Promise object representing the server response to the submitted signup form
     */
    signup(userData) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/signup`, userData)
                .then((response) => {
                    if (!response.auth) return reject(response);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}
