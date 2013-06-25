/* global EntityBase, NumericField, TextField */

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
K.Broadcast.TITLE = new TextField('title');
K.Broadcast.CATEGORY = new TextField('category');
K.Broadcast.EPISODE = new NumericField('episode');
K.Broadcast.SYNOPSIS = new TextField('synopsis');
K.Broadcast.START = new NumericField('start');
K.Broadcast.END = new NumericField('end');
K.Broadcast.YEAR = new TextField('year');
K.Broadcast.VIDEO_ID = new TextField('videoId');
K.Broadcast.SELF_LINK = new TextField('selfLink');
K.Broadcast.MORE_LINK = new TextField('moreLink');
K.Broadcast.OPENGRAPH_LINK = new TextField('opengraphLink');

K.Broadcast.prototype = Object.create(EntityBase.prototype);
K.Broadcast.prototype._baseURL = 'broadcasts.json?';

K.utils.addFactory(K.Broadcast);