import { AuthService } from '../services/auth.service';
import { NewsService } from '../services/news.service';
import { Routing } from '../core/routing.service';

/** Class representing the news component */
export class NewsComponent {
    /** Create authentication, news and routing services */
    constructor() {
        this._authService = new AuthService();
        this._newsService = new NewsService();
        this._routing = new Routing();
        this._usersNews;
    }

    /**
     * Asynchronously get latest users news object
     * @returns {Promise<void>} The Promise object representing the requested users news
     */
    async beforeRender() {
        this._usersNews = await this._newsService.getNews(this._authService.token);
        console.log('News: ', this._usersNews);
    }

    /**
     * Create the news component template
     * @returns {string} A string representing the news component template
     */
    render() {
        return `
            <!-- Component styles -->
            <style>
                ${this._style()}
            </style>
            <!-- Component html -->
            <h2 class="news-title text-center text-capitalize mt-3">latest news</h2>
            <div class="d-flex flex-column align-items-center">
                ${this._getNewsItems()}
            </div>
        `;
    }

    /**
     * Create the news component images template
     * @returns {string} A string representing the news component images template
     * @private
     */
    _getNewsItems() {
        let latestUsersNews = '';
        for (let item of this._usersNews.news) {
            const date = new Date(item.date);
            const day = date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`;
            const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
            const year = date.getFullYear();

            latestUsersNews += `
                <div class = "d-flex p-2">
                    <div class="d-flex flex-column align-items-center col-3 p-4">
                        <img class="user-avatar mt-2" src="${item.owner.avatar}" alt="user avatar">
                        <span class="font-weight-bold text-info mt-4">${item.owner.full_name}</span>
                        <span class="font-italic mt-2">${item.owner.country}</span>
                        <span class="text-black-50 mt-2">${day}-${month}-${year}</span>
                    </div>
                    <div class="col-9 p-3">
                        <img class="user-picture" src="${item.pictures[0].url}" alt="latest photo">
                    </div>
                </div>
            `;
        }
        return latestUsersNews;
    }

    /**
     * Create the news component style template
     * @returns {string} A string representing the news component style template
     * @private
     */
    _style() {
        return `
            .news-title {
                color: darkslateblue;
            }
            .user-avatar {
                width: 138px;
                height: 138px;
                border-radius: 50%;
                overflow: hidden;
            }
            .user-picture {
                border-radius: 14px;
                object-fit: cover;
                width: 800px;
            }        
        `;
    }

    afterRender() {}
}