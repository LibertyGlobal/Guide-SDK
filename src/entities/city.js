/**
 * Class describes city-specific fields and request logic
 * @namespace kraken.entities
 * @class City
 * @extends EntityBase
 */

(function (kraken) {
    kraken.City = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'regions.json';
    }

    kraken.utils.addFactory(kraken.City);

    var p = kraken.City.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);