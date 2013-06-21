/**
 * Class describes country-specific fields and request logic
 * @namespace kraken.entities
 * @class Country
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Country = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'regions.json';
    }

    kraken.utils.addFactory(kraken.Country);

    var p = kraken.Country.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);