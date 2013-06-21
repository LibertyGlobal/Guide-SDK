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
        var pipelineData = [];
        kraken.jsonp(URL, {}, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
    }

    p.proceedResponse = function (response, nextBatchSteps, pipelineData) {
        pipelineData = pipelineData.concat(response.data);
        this.nextBatchLinkURL = response.nextBatchLink.href;
        nextBatchSteps--;

        if ((nextBatchSteps > 0 || nextBatchSteps === undefined) && nextBatchLinkURL){
            kraken.jsonp(this.nextBatchLinkURL, {}, this.createScopedCallback(callback, nextBatchSteps));
        }
    }

    p.createScopedCallback = function (callback, nextBatchSteps, pipelineData) {
        var scopedCallback = function (data) {
            this.proceedResponse(data, nextBatchSteps, pipelineData);
            callback.bind(this)(data);
        }

        return scopedCallback.bind(this);
    }
})(typeof exports === 'undefined' ? this.kraken : exports);