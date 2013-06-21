/**
 * Class describes country-specific fields and request logic
 * @namespace kraken.entities
 * @class Country
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Country = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'regions.json';
    }

    kraken.Country.ID = new kraken.TextField('id');
    kraken.Country.NAME = new kraken.TextField('name');
    kraken.Country.CHANNEL_LINEUP_LINK = new kraken.TextField('channelLineupLink');
    kraken.Country.SELF_LINK = new kraken.TextField('selfLink');
    kraken.Country.TOP_BROADCASTS_LINK = new kraken.TextField('topBroadcastsLink');
    kraken.Country.TOP_VIDEOS_LINK = new kraken.TextField('topVideosLink');

    kraken.utils.addFactory(kraken.Country);

    var p = kraken.Country.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);