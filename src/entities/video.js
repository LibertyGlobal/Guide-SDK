/**
 * Class describes video-specific fields and request logic
 * @namespace kraken.entities
 * @class Video
 * @extends EntityBase
 */

K.Video = function () {
    EntityBase.call(this);
    if (kraken.config.region === undefined) {
        console.warn('Please, specify region before sending requests to Video endpoint.');
    }
};

K.Video.ID = new RootChangingField('id', 'videos');
K.Video.TITLE = new TextField('title');
K.Video.SYNOPSIS = new TextField('synopsis');
K.Video.CATEGORY = new TextField('category');
K.Video.SEASON = new NumericField('season');
K.Video.EPISODE = new NumericField('episode');
K.Video.CRID = new TextField('crid');
K.Video.STATISTICS = new TextField('statistics');
K.Video.AGE_RATING = new TextField('ageRating');
K.Video.IMAGE_LINK = new TextField('imageLink');
K.Video.OPENGRAPH_LINK = new TextField('opengraphLink');
K.Video.SELF_LINK = new TextField('selfLink');
K.Video.CAST = new TextField('cast');
K.Video.DIRECTORS = new TextField('directors');
K.Video.WRITERS = new TextField('writers');
K.Video.BPM = new NumericField('statistics.bpm');
K.Video.POPULARITY = new NumericField('statistics.popularity');
K.Video.MORE_LINK = new TextField('moreLink');

K.utils.addFactory(K.Video);

K.Video.prototype = Object.create(EntityBase.prototype);
K.Video.prototype._baseURL = 'videos.json?';
K.Video.prototype._URLprefix = 'data/';