/**
 * Class describes channel-specific fields and request logic
 * @namespace kraken.entities
 * @class Channel
 * @extends EntityBase
 */

K.Channel = function () {
    EntityBase.call(this);
    if (kraken.config.region === undefined) {
        console.warn('Please, specify region before sending requests to Channel endpoint.');
    }
};

K.Channel.REF = new TextField('ref');
K.Channel.NAME = new TextField('name');
K.Channel.SYNOPSIS = new TextField('synopsis');
K.Channel.LOGICAL_POSITION = new NumericField('logicalPosition');
K.Channel.LOGO_LINK = new TextField('logoLink');
K.Channel.BROADCASTS_LINK = new TextField('broadcastsLink');
K.Channel.OPENGRAPH_LINK = new TextField('opengraphLink');
K.Channel.SELF_LINK = new TextField('selfLink');
K.Channel.GENRES = new TextField('genres');
K.Channel.BROADCASTS = new TextField('broadcasts');

K.utils.addFactory(K.Channel);

K.Channel.prototype = Object.create(EntityBase.prototype);
K.Channel.prototype._baseURL = 'channels.json?';