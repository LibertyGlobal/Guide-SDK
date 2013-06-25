/**
 * @namespace utils
 * @module utils
 */

K.utils = {
    addFactory: function (objectToProceed) {
        objectToProceed.create = function () {
            return new objectToProceed();
        }
    }
};