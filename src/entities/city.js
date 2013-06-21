/**
 * Class describes city-specific fields and request logic
 * @namespace kraken.entities
 * @class City
 * @extends EntityBase
 */

(function (kraken) {
    kraken.City = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'regions.json';
    }

    kraken.City.ID = new kraken.TextField('id');
    kraken.City.NAME = new kraken.TextField('name');
    kraken.City.CHANNEL_LINEUP_LINK = new kraken.TextField('channelLineupLink');
    kraken.City.SELF_LINK = new kraken.TextField('selfLink');
    kraken.City.TOP_BROADCASTS_LINK = new kraken.TextField('topBroadcastsLink');
    kraken.City.TOP_VIDEOS_LINK = new kraken.TextField('topVideosLink');

    kraken.utils.addFactory(kraken.City);

    var p = kraken.City.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);