/**
 * Numeric field supports math comparing functions.
 * @namespace kraken.fields
 * @class NumericField
 * @extends AbstractField
 */

(function (kraken) {
    kraken.NumericField = function (name) {
        kraken.AbstractField.call(this, name);
    }

    var p = kraken.NumericField.prototype = Object.create(kraken.AbstractField.prototype);

    p.equalTo = function (operand) {
        return this.getStringForOperation('=', operand);
    }

    p.greaterThan = function (operand) {
        return this.getStringForOperation('>', operand);
    }

    p.lessThan = function (operand) {
        return this.getStringForOperation('<', operand);
    }

})(typeof exports === 'undefined' ? this.kraken : exports);