/**
 * Class describes country-specific fields and request logic
 * @namespace kraken.entities
 * @class Country
 * @extends EntityBase
 */

K.Country = function () {
    EntityBase.call(this);
};

K.Country.ID = new TextField('id');
K.Country.NAME = new TextField('name');
K.Country.CHANNEL_LINEUP_LINK = new TextField('channelLineupLink');
K.Country.SELF_LINK = new TextField('selfLink');
K.Country.TOP_BROADCASTS_LINK = new TextField('topBroadcastsLink');
K.Country.TOP_VIDEOS_LINK = new TextField('topVideosLink');

K.utils.addFactory(K.Country);

K.Country.prototype = Object.create(EntityBase.prototype);
K.Country.prototype._baseURL = 'regions.json';