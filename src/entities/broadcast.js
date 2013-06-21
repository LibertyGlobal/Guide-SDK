/**
 * Class describes broadcast-specific fields and request logic
 * @namespace kraken.entities
 * @class Broadcast
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Broadcast = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'broadcasts.json?';
    }

    kraken.Broadcast.ID = new kraken.TextField('id');
    kraken.Broadcast.TITLE = new kraken.TextField('title');
    kraken.Broadcast.CATEGORY = new kraken.TextField('category');
    kraken.Broadcast.EPISODE = new kraken.NumericField('episode');
    kraken.Broadcast.SYNOPSIS = new kraken.TextField('synopsis');
    kraken.Broadcast.START = new kraken.NumericField('start');
    kraken.Broadcast.END = new kraken.NumericField('end');
    kraken.Broadcast.YEAR = new kraken.TextField('year');
    kraken.Broadcast.VIDEO_ID = new kraken.TextField('videoId');
    kraken.Broadcast.SELF_LINK = new kraken.TextField('selfLink');
    kraken.Broadcast.MORE_LINK = new kraken.TextField('moreLink');
    kraken.Broadcast.OPENGRAPH_LINK = new kraken.TextField('opengraphLink');

    kraken.utils.addFactory(kraken.Broadcast);

    var p = kraken.Broadcast.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);