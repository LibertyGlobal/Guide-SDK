/**
 * GuideRequest is a class which is designed to be used as a property of entity to communicate with server and remember state of data transfer
 * @namespace LGI.Guide
 * @class GuideRequest
 */

function GuideRequest() {
    //Initial request URL needed to make items observable and fire onChange event of entity
    //noinspection JSUnusedGlobalSymbols
    this.initialRequestURL = '';
    this.nextBatchLink = '';
}

GuideRequest.prototype.execute = function (URL, callback, nextBatchSteps) {
    var pipelineData = [];

    //noinspection JSUnusedGlobalSymbols
    this.initialRequestURL = URL;

    requestTransport(URL,
        this.createScopedCallback(callback, nextBatchSteps, pipelineData),
        errorCallback);
};

GuideRequest.prototype.proceedResponse = function (response, nextBatchSteps, pipelineData, callback) {
    pipelineData = pipelineData.concat(response.data);

    if (response.nextBatchLink) {
        this.nextBatchLink = response.nextBatchLink.href;
    } else {
        this.nextBatchLink = undefined;
    }

    if (nextBatchSteps !== undefined) {
        nextBatchSteps--;
    }

    if ((nextBatchSteps > 0 || nextBatchSteps === undefined) && this.nextBatchLink !== undefined && !!this.nextBatchLink) {
        requestTransport(this.nextBatchLink, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
    } else {
        if (callback !== undefined) {
            callback.bind(this)(pipelineData, response);
        }
    }
};

GuideRequest.prototype.createScopedCallback = function (callback, nextBatchSteps, pipelineData) {
    var scopedCallback = function (data) {
        this.proceedResponse(data, nextBatchSteps, pipelineData, callback);
    };

    return scopedCallback.bind(this);
};
