/**
 * Class describes channel-specific fields and request logic
 * @namespace kraken.entities
 * @class Channel
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Channel = function () {
        kraken.EntityBase.call(this);
        this.baseURL = 'channels.json?';
    }

    var p = kraken.Channel.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);