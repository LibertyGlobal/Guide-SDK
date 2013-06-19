function ChannelRequest(limit) {
    AbstractRequest.call(this, ChannelRequest.resource, limit || 0);
}

ChannelRequest.resource = 'channel';
ChannelRequest.url = 'channels.json';

ChannelRequest.prototype = Object.create(AbstractRequest.prototype);

ChannelRequest.prototype.listDefaultFields = function () {
    return [
        SDK.Channel.ID,
        SDK.Channel.NAME,
        SDK.Channel.POSITION
    ];
};

ChannelRequest.prototype.toString = function () {
    var parameters = [];

    this.buildDefaultParameters(parameters);

    return this.buildURL(ChannelRequest.url, parameters);
};