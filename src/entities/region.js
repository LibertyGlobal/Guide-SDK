/**
 * Encapsulates Region-specific fields and request logic
 * @namespace kraken.entities
 * @class Region
 * @extends EntityBase
 */
K.Region = function () {
    EntityBase.call(this);
};

K.Region.ID = new TextField('id');
K.Region.NAME = new TextField('name');
K.Region.SUBREGIONS = new TextField('subregions');
K.Region.GENRES = new TextField('genres');
K.Region.CATEGORIES = new TextField('categories');
K.Region.CHANNEL_LINEUP_LINK = new TextField('channelLineupLink');
K.Region.SELF_LINK = new TextField('selfLink');
K.Region.TOP_BROADCASTS_LINK = new TextField('topBroadcastsLink');
K.Region.TOP_VIDEOS_LINK = new TextField('topVideosLink');

K.utils.addFactory(K.Region);

K.Region.prototype = Object.create(EntityBase.prototype);
K.Region.prototype._baseURL = 'regions.json?';