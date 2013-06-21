/**
 * @namespace utils
 * @module utils
 */

(function (kraken) {
    kraken.utils = {
        addFactory: function (objectToProceed) {
            objectToProceed.create = function () {
                return new objectToProceed();
            }
        }
    }
})(typeof exports === 'undefined' ? this.kraken : exports);