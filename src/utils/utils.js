/**
 * @namespace utils
 * @module utils
 */

LGI.Guide.utils = {
    addFactory: function (objectToProceed) {
        objectToProceed.create = function () {
            return new objectToProceed();
        }
    }
};