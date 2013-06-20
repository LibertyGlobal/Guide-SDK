/**
 * Class describes broadcast-specific fields and request logic
 * @namespace kraken.entities
 * @class Broadcast
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Broadcast = function () {
        kraken.EntityBase.call(this);
        this.baseURL = 'broadcasts.json?';
    }

    var p = kraken.Broadcast.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);