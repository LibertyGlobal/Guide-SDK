/**
 * Request is a property of entity which communicates to server and remember state of transmittion
 * @namespace kraken
 * @class Request
 */

(function (kraken) {
    kraken.Request = function () {
        this.initialRequestURL = '';
        this.nextBatchLink = '';
    }

    var p = kraken.Request.prototype;

    p.execute = function (URL, callback, nextBatchSteps) {
        kraken.jsonp(URL, {}, callback);
    }

    p.proceedResponse = function (response) {
        /*TODO Save nextBatchAdress for next page processing
         Also add data to temporary object
         And request nextBatchAdress one more time if nextBatchSteps is greater than 0*/
    }
})(typeof exports === 'undefined' ? this.kraken : exports);