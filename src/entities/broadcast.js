/**
 * Class describes broadcast-specific fields and request logic
 * @namespace LGI.Guide.entities
 * @class Broadcast
 * @extends EntityBase
 */

LGI.Guide.Broadcast = function () {
    EntityBase.call(this);
    if (LGI.Guide.config.region === undefined) {
        console.warn('Please, specify region before sending requests to Broadcasts endpoint.');
    }
};

LGI.Guide.Broadcast.ID = new RootChangingField('id', 'broadcasts');
LGI.Guide.Broadcast.START = new NumericField('start');
LGI.Guide.Broadcast.END = new NumericField('end');
LGI.Guide.Broadcast.CRID = new TextField('video.crid');
LGI.Guide.Broadcast.IMI = new TextField('imi');
LGI.Guide.Broadcast.CHANNEL = new TextField('channel');
LGI.Guide.Broadcast.CHANNEL_NAME = new TextField('channel.name');
LGI.Guide.Broadcast.CHANNEL_NUMBER = new NumericField('channel.logicalPosition');
LGI.Guide.Broadcast.LOGICAL_POSITION = new NumericField('channel.logicalPosition');
//LGI.Guide.Broadcast.CHANNEL_REF = new PrependField('channel.ref', 'channels');
//LGI.Guide.Broadcast.STATISTICS = new TextField('video.statistics');
LGI.Guide.Broadcast.VIDEO_ID = new TextField('video.id');
LGI.Guide.Broadcast.TITLE = new TextField('video.title');
LGI.Guide.Broadcast.SYNOPSIS = new TextField('video.synopsis');
LGI.Guide.Broadcast.SHORT_SYNOPSIS = new TextField('video.shortSynopsis');
LGI.Guide.Broadcast.AGE_RATING = new TextField('video.ageRating');
LGI.Guide.Broadcast.CATEGORY = new TextField('video.category');
LGI.Guide.Broadcast.SUBCATEGORY = new TextField('video.subcategory');
//LGI.Guide.Broadcast.OPENGRAPH_LINK = new TextField('video.opengraphLink');
LGI.Guide.Broadcast.RECORD_LINK = new TextField('video.recordLink');
//LGI.Guide.Broadcast.SELF_LINK = new TextField('selfLink');
LGI.Guide.Broadcast.CAST = new TextField('video.cast');
LGI.Guide.Broadcast.DIRECTORS = new TextField('video.directors');
LGI.Guide.Broadcast.WRITERS = new TextField('video.writers');
LGI.Guide.Broadcast.YEAR = new NumericField('video.year');
//LGI.Guide.Broadcast.EPISODE = new NumericField('episode');
//LGI.Guide.Broadcast.SEASON = new NumericField('season');
LGI.Guide.Broadcast.IMAGE_LINK = new NumericField('video.imageLink');
LGI.Guide.Broadcast.VIDEO_BPM = new NumericField('video.statistics.bpm');
LGI.Guide.Broadcast.LANGUAGE = new TextField('video.language');
LGI.Guide.Broadcast.BPM = new NumericField('statistics.bpm');
LGI.Guide.Broadcast.POPULARITY = new NumericField('statistics.popularity');
//LGI.Guide.Broadcast.MORE_LINK = new TextField('moreLink');

LGI.Guide.utils.addFactory(LGI.Guide.Broadcast);

LGI.Guide.Broadcast.prototype = Object.create(EntityBase.prototype);
LGI.Guide.Broadcast.prototype._baseURL = 'broadcasts.json?';
LGI.Guide.Broadcast.prototype._URLprefix = 'data/';
