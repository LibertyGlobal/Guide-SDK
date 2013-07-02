/**
 * Class describes broadcast-specific fields and request logic
 * @namespace kraken.entities
 * @class Broadcast
 * @extends EntityBase
 */

K.Broadcast = function () {
    EntityBase.call(this);
};

K.Broadcast.ID = new TextField('id');
K.Broadcast.START = new NumericField('start');
K.Broadcast.END = new NumericField('end');
K.Broadcast.CRID = new TextField('crid');
K.Broadcast.IMI = new TextField('imi');
K.Broadcast.CHANNEL = new TextField('channel');
K.Broadcast.STATISTICS = new TextField('statistics');
K.Broadcast.VIDEO_ID = new TextField('videoId');
K.Broadcast.IMDB_ID = new TextField('imdbId');
K.Broadcast.YEAR = new NumericField('year');
K.Broadcast.TITLE = new TextField('title');
K.Broadcast.SYNOPSIS = new TextField('synopsis');
K.Broadcast.CATEGORY = new TextField('category');
K.Broadcast.OPENGRAPH_LINK = new TextField('opengraphLink');
K.Broadcast.SELF_LINK = new TextField('selfLink');
K.Broadcast.CAST = new TextField('cast');
K.Broadcast.DIRECTORS = new TextField('directors');
K.Broadcast.WRITERS = new TextField('writers');
K.Broadcast.EPISODE = new NumericField('episode');
K.Broadcast.SEASON = new NumericField('season');
K.Broadcast.IMAGE_LINK = new NumericField('imageLink');
K.Broadcast.MORE_LINK = new TextField('moreLink');


K.Broadcast.prototype = Object.create(EntityBase.prototype);
K.Broadcast.prototype._baseURL = 'broadcasts.json?';

K.utils.addFactory(K.Broadcast);