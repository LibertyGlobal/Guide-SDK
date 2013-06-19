function RegionRequest(limit) {
    AbstractRequest.call(this, RegionRequest.resource, limit || 0);
}

RegionRequest.resource = 'region';
RegionRequest.url = 'regions.json';

RegionRequest.prototype = Object.create(AbstractRequest.prototype);

RegionRequest.prototype.listDefaultFields = function () {
    return [
        SDK.Region.ID,
        SDK.Region.NAME,
        SDK.Region.CHANNEL_LINEUP_LINK
    ];
};

RegionRequest.prototype.toString = function () {
    var parameters = [];

    this.buildDefaultParameters(parameters);

    return this.buildURL(RegionRequest.url, parameters);
};