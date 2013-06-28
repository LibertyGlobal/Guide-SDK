/**
 * Determines are we in NodeJS or not and returns right transport module.
 * @namespace kraken
 * @function kraken.requestTransport
 */

var chooseTransport = function () {
    if (typeof module !== 'undefined' && module.exports) {
        return nodeRequest();
    } else {
        return jsonp();
    }
};

var requestTransport = chooseTransport();

