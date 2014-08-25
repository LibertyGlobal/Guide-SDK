/**
 * Class describes video-specific fields and request logic
 * @namespace LGI.Guide.entities
 * @class Video
 * @extends EntityBase
 */

LGI.Guide.Video = function () {
    EntityBase.call(this);
    if (LGI.Guide.config.region === undefined) {
        console.warn('Please, specify region before sending requests to Video endpoint.');
    }
};

LGI.Guide.Video.ID = new RootChangingField('id', 'videos');
LGI.Guide.Video.TITLE = new TextField('title');
LGI.Guide.Video.SYNOPSIS = new TextField('synopsis');
LGI.Guide.Video.CATEGORY = new TextField('category');
LGI.Guide.Video.SEASON = new NumericField('season');
LGI.Guide.Video.EPISODE = new NumericField('episode');
LGI.Guide.Video.CRID = new TextField('crid');
LGI.Guide.Video.STATISTICS = new TextField('statistics');
LGI.Guide.Video.AGE_RATING = new TextField('ageRating');
LGI.Guide.Video.IMAGE_LINK = new TextField('imageLink');
LGI.Guide.Video.OPENGRAPH_LINK = new TextField('opengraphLink');
LGI.Guide.Video.SELF_LINK = new TextField('selfLink');
LGI.Guide.Video.CAST = new TextField('cast');
LGI.Guide.Video.DIRECTORS = new TextField('directors');
LGI.Guide.Video.WRITERS = new TextField('writers');
LGI.Guide.Video.BPM = new NumericField('statistics.bpm');
LGI.Guide.Video.POPULARITY = new NumericField('statistics.popularity');
LGI.Guide.Video.MORE_LINK = new TextField('moreLink');

LGI.Guide.utils.addFactory(LGI.Guide.Video);

LGI.Guide.Video.prototype = Object.create(EntityBase.prototype);
LGI.Guide.Video.prototype._baseURL = 'videos.json?';
LGI.Guide.Video.prototype._URLprefix = 'data/';