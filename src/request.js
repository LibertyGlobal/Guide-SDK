/**
 * Request is a property of entity which communicates to server and remember state of transmittion
 * @namespace kraken
 * @class Request
 */

function Request() {
    //Initial request URL needed to make items observable and fire onChange event of entity
    //noinspection JSUnusedGlobalSymbols
    this.initialRequestURL = '';
    this.nextBatchLink = '';
}

Request.prototype.execute = function (URL, callback, nextBatchSteps) {
    var pipelineData = [];

    //noinspection JSUnusedGlobalSymbols
    this.initialRequestURL = URL;

    jsonp(URL, {}, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
};

Request.prototype.proceedResponse = function (response, nextBatchSteps, pipelineData, callback) {
    pipelineData = pipelineData.concat(response.data);

    if (response.nextBatchLink) {
        this.nextBatchLinkURL = response.nextBatchLink.href;
    }

    if (nextBatchSteps !== undefined) {
        nextBatchSteps--;
    }

    if ((nextBatchSteps > 0 || nextBatchSteps === undefined) && this.nextBatchLinkURL) {
        jsonp(this.nextBatchLinkURL, {}, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
    } else {
        callback.bind(this)(pipelineData);
    }
};

Request.prototype.createScopedCallback = function (callback, nextBatchSteps, pipelineData) {
    var scopedCallback = function (data) {
        this.proceedResponse(data, nextBatchSteps, pipelineData, callback);
    };

    return scopedCallback.bind(this);
};