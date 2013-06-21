/**
 * Class describes channel-specific fields and request logic
 * @namespace kraken.entities
 * @class Channel
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Channel = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'channels.json?';
    }

    kraken.Channel.ID = new kraken.TextField('id');
    kraken.Channel.NAME = new kraken.TextField('name');
    kraken.Channel.LOGICAL_POSITION = new kraken.NumericField('logicalPosition');
    kraken.Channel.SELF_LINK = new kraken.TextField('selfLink');
    kraken.Channel.BROADCASTS_LINK = new kraken.TextField('broadcastsLink');
    kraken.Channel.OPENGRAPH_LINK = new kraken.TextField('opengraphLink');

    kraken.utils.addFactory(kraken.Channel);

    var p = kraken.Channel.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);