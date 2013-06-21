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

    kraken.utils.addFactory(kraken.Channel);

    var p = kraken.Channel.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);