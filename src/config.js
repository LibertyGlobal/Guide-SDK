/**
 * Global variables
 * @namespace kraken
 * @module config
 */

(function (exports) {
    exports.config = {
        /**
         * Represents URL of Kraken REST server.
         * @const kraken.APIURL
         */
        APIURL: 'http://appdev.io/kraken/v2/schedule/',
        region: ''
    }
})(typeof exports === 'undefined' ? this.kraken : exports);