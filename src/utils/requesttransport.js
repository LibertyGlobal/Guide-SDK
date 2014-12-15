/**
 * Selects the appropriate transport adapter for current environment.
 * @namespace LGI.Guide
 * @function LGI.Guide.requestTransport
 */

var chooseTransport = function () {
    if (typeof MAF !== 'undefined') {
        return mafRequest();
    } else if (typeof module !== 'undefined' && module.exports) {
        return nodeRequest();
    } else {
        return xhrRequest();
    }
};

var requestTransport = chooseTransport();

