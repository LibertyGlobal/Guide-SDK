/**
 * Class describes channel-specific fields and request logic
 * @namespace LGI.Guide.entities
 * @class Channel
 * @extends EntityBase
 */

LGI.Guide.Channel = function () {
    EntityBase.call(this);
    if (LGI.Guide.config.region === undefined) {
        console.warn('Please, specify region before sending requests to Channel endpoint.');
    }
};

LGI.Guide.Channel.REF = new TextField('ref');
LGI.Guide.Channel.NAME = new TextField('name');
LGI.Guide.Channel.LOGICAL_POSITION = new NumericField('logicalPosition');
LGI.Guide.Channel.LOGO_LINK = new TextField('logoLink');
LGI.Guide.Channel.BROADCASTS_LINK = new TextField('broadcastsLink');
LGI.Guide.Channel.OPENGRAPH_LINK = new TextField('opengraphLink');
LGI.Guide.Channel.SELF_LINK = new TextField('selfLink');
LGI.Guide.Channel.GENRES = new TextField('genres');
LGI.Guide.Channel.BROADCASTS = new TextField('broadcasts');

LGI.Guide.utils.addFactory(LGI.Guide.Channel);

LGI.Guide.Channel.prototype = Object.create(EntityBase.prototype);
LGI.Guide.Channel.prototype._baseURL = 'channels.json?';
LGI.Guide.Channel.prototype._URLprefix = 'data/';