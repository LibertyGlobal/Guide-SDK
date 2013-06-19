function BroadcastRequest(limit) {
    AbstractRequest.call(this, BroadcastRequest.resource, limit || 0);
}

BroadcastRequest.resource = 'broadcast';
BroadcastRequest.url = 'broadcasts.json';

BroadcastRequest.prototype = Object.create(AbstractRequest.prototype);

BroadcastRequest.prototype.listDefaultFields = function () {
    return [
        SDK.Broadcast.ID,
        SDK.Broadcast.CHANNEL_ID,
        SDK.Broadcast.TITLE,
        SDK.Broadcast.START_TIME,
        SDK.Broadcast.END_TIME
    ];
};

BroadcastRequest.prototype.toString = function () {
    var parameters = [];

    this.buildDefaultParameters(parameters);

    return this.buildURL(BroadcastRequest.url, parameters);
};