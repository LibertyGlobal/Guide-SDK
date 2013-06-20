/**
 * Class describes country-specific fields and request logic
 * @namespace kraken.entities
 * @class Country
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Country = function () {
        kraken.EntityBase.call(this);
        this.baseURL = 'regions.json';
    }

    var p = kraken.Country.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);