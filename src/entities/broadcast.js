/**
 * Class describes broadcast-specific fields and request logic
 * @namespace kraken.entities
 * @class Broadcast
 * @extends EntityBase
 */

K.Broadcast = function () {
    EntityBase.call(this);
    if (kraken.config.region === undefined) {
        console.warn('Please, specify region before sending requests to Broadcasts endpoint.');
    }
};

K.Broadcast.ID = new RootChangingField('id', 'broadcasts');
K.Broadcast.START = new NumericField('start');
K.Broadcast.END = new NumericField('end');
K.Broadcast.CRID = new TextField('video.crid');
K.Broadcast.IMI = new TextField('imi');
K.Broadcast.CHANNEL = new TextField('channel');
K.Broadcast.CHANNEL_NAME = new TextField('channel.name');
//K.Broadcast.CHANNEL_REF = new PrependField('channel.ref', 'channels');
//K.Broadcast.STATISTICS = new TextField('video.statistics');
K.Broadcast.VIDEO_ID = new TextField('video.id');
K.Broadcast.TITLE = new TextField('video.title');
K.Broadcast.SYNOPSIS = new TextField('video.synopsis');
K.Broadcast.AGE_RATING = new TextField('video.ageRating');
K.Broadcast.CATEGORY = new TextField('video.category');
//K.Broadcast.OPENGRAPH_LINK = new TextField('video.opengraphLink');
K.Broadcast.RECORD_LINK = new TextField('video.recordLink');
//K.Broadcast.SELF_LINK = new TextField('selfLink');
K.Broadcast.CAST = new TextField('video.cast');
K.Broadcast.DIRECTORS = new TextField('video.directors');
K.Broadcast.WRITERS = new TextField('video.writers');
//K.Broadcast.EPISODE = new NumericField('episode');
//K.Broadcast.SEASON = new NumericField('season');
K.Broadcast.IMAGE_LINK = new NumericField('video.imageLink');
K.Broadcast.BPM = new NumericField('statistics.bpm');
K.Broadcast.POPULARITY = new NumericField('statistics.popularity');
//K.Broadcast.MORE_LINK = new TextField('moreLink');

K.utils.addFactory(K.Broadcast);

K.Broadcast.prototype = Object.create(EntityBase.prototype);
K.Broadcast.prototype._baseURL = 'broadcasts.json?';
K.Broadcast.prototype._URLprefix = 'data/';