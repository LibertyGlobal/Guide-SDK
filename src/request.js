/**
 * Request is a property of entity which communicates to server and remember state of transmittion
 * @namespace kraken
 * @class Request
 */

(function (kraken) {
    kraken.Request = function () {
        //Initial request URL needed to make items observable and fire onChange event of entity
        this.initialRequestURL = '';
        this.nextBatchLink = '';
    }

    var p = kraken.Request.prototype;

    p.execute = function (URL, callback, nextBatchSteps) {
        var pipelineData = [];
        this.initialRequestURL = URL;
        kraken.jsonp(URL, {}, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
    }

    p.proceedResponse = function (response, nextBatchSteps, pipelineData, callback) {
        pipelineData = pipelineData.concat(response.data);
        if (response.nextBatchLink) {
            this.nextBatchLinkURL = response.nextBatchLink.href;
        }

        if (nextBatchSteps !== undefined) {
            nextBatchSteps--;
        }

        if ((nextBatchSteps > 0 || nextBatchSteps === undefined) && this.nextBatchLinkURL) {
            kraken.jsonp(this.nextBatchLinkURL, {}, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
        } else {
            callback.bind(this)(pipelineData);
        }
    }

    p.createScopedCallback = function (callback, nextBatchSteps, pipelineData) {
        var scopedCallback = function (data) {
            this.proceedResponse(data, nextBatchSteps, pipelineData, callback);
        }

        return scopedCallback.bind(this);
    }
})(typeof exports === 'undefined' ? this.kraken : exports);