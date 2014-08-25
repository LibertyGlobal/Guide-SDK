/**
 * Determines are we in NodeJS or not and returns right transport module.
 * @namespace LGI.Guide
 * @function LGI.Guide.requestTransport
 */

var chooseTransport = function () {
    if (typeof module !== 'undefined' && module.exports) {
        return nodeRequest();
    } else {
        return jsonp();
    }
};

var requestTransport = chooseTransport();

