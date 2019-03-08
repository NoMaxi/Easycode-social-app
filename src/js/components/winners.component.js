import { AuthService } from '../services/auth.service';
import { WinnersService } from '../services/winners.service';

/** Class representing the winners component */
export class WinnersComponent {
    /** Create authentication and winners services */
    constructor() {
        this._authService = new AuthService();
        this._winnersService = new WinnersService();
        this._winners;
    }

    /**
     * Asynchronously get winners object
     * @returns {Promise<void>} The Promise object representing the requested winners
     */
    async beforeRender() {
        this._winners = await this._winnersService.getWinners(1, 15);
        console.log('Winners: ', this._winners);
    }

    /**
     * Create the winners component template
     * @returns {string} A string representing the news component template
     */
    render() {
        return `
            <!-- Component styles -->
            <style>
                ${this._style()}
            </style>
            <!-- Component html -->
            <div class="bg-container d-flex justify-content-center align-content-center">
                <h1 class="winners-title align-self-top text-center text-white">Discover inspiring</h1>
            </div>
            <div class="container d-flex align-items-center flex-wrap py-5">
                ${this._getWinnersItems()}
            </div>
        `;
    }

    /**
     * Create the winners component images template
     * @returns {string} A string representing the winners component images template
     * @private
     */
    _getWinnersItems() {
        let winnersImages = '';
        for (let item of this._winners.winners) {
            winnersImages += `
                <img class="winner-img col-4 p-1" src="${item.member_id.images[0].image_basic.url}" alt="winner photo">
            `;
        }
        return winnersImages;
    }

    /**
     * Create the winners component style template
     * @returns {string} A string representing the winners component style template
     * @private
     */
    _style() {
        return `
            app-container {
                background-color: #f1ead7;
            }
            .bg-container {
                background-image: url(http://mostlikedperson-client.herokuapp.com/assets/img/backgrounds/winners-bg.png);
                height: 500px;
                padding-top: 150px;
            }
            .winners-title {
                font-size: 48px;
            }
            .winner-img {
                object-fit: cover;
                height: 100%;
            }
        `;
    }

    afterRender() {}
}