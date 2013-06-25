/* global EntityBase, NumericField, TextField */

/**
 * Class describes channel-specific fields and request logic
 * @namespace kraken.entities
 * @class Channel
 * @extends EntityBase
 */

K.Channel = function () {
    EntityBase.call(this);
};

K.Channel.ID = new TextField('id');
K.Channel.NAME = new TextField('name');
K.Channel.LOGICAL_POSITION = new NumericField('logicalPosition');
K.Channel.SELF_LINK = new TextField('selfLink');
K.Channel.BROADCASTS_LINK = new TextField('broadcastsLink');
K.Channel.OPENGRAPH_LINK = new TextField('opengraphLink');

K.utils.addFactory(K.Channel);

K.Channel.prototype = Object.create(EntityBase.prototype);
K.Channel.prototype._baseURL = 'channels.json?';