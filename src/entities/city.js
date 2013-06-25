/**
 * Class describes city-specific fields and request logic
 * @namespace kraken.entities
 * @class City
 * @extends EntityBase
 */

K.City = function () {
    EntityBase.call(this);
};

K.City.ID = new TextField('id');
K.City.NAME = new TextField('name');
K.City.CHANNEL_LINEUP_LINK = new TextField('channelLineupLink');
K.City.SELF_LINK = new TextField('selfLink');
K.City.TOP_BROADCASTS_LINK = new TextField('topBroadcastsLink');
K.City.TOP_VIDEOS_LINK = new TextField('topVideosLink');

K.utils.addFactory(K.City);

K.City.prototype = Object.create(EntityBase.prototype);
K.City.prototype._baseURL = 'regions.json';