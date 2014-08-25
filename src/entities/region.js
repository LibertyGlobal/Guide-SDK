/**
 * Encapsulates Region-specific fields and request logic
 * @namespace LGI.Guide.entities
 * @class Region
 * @extends EntityBase
 */
LGI.Guide.Region = function () {
    EntityBase.call(this);
};

LGI.Guide.Region.ID = new TextField('id');
LGI.Guide.Region.NAME = new TextField('name');
LGI.Guide.Region.SUBREGIONS = new TextField('subregions');
LGI.Guide.Region.GENRES = new TextField('genres');
LGI.Guide.Region.CATEGORIES = new TextField('categories');
LGI.Guide.Region.CHANNEL_LINEUP_LINK = new TextField('channelLineupLink');
LGI.Guide.Region.SELF_LINK = new TextField('selfLink');
LGI.Guide.Region.TOP_BROADCASTS_LINK = new TextField('topBroadcastsLink');
LGI.Guide.Region.TOP_VIDEOS_LINK = new TextField('topVideosLink');

LGI.Guide.utils.addFactory(LGI.Guide.Region);

LGI.Guide.Region.prototype = Object.create(EntityBase.prototype);
LGI.Guide.Region.prototype._baseURL = 'regions.json?';