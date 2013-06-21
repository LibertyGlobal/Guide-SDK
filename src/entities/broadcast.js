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

    kraken.utils.addFactory(kraken.Broadcast);

    var p = kraken.Broadcast.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);