/**
 * Numeric field supports math comparing functions.
 * @namespace kraken.fields
 * @class NumericField
 * @extends AbstractField
 */

(function (kraken) {
    kraken.NumericField = function (name) {
        kraken.AbstractField.call(this, name);
    };

    var p = kraken.NumericField.prototype = Object.create(kraken.AbstractField.prototype);

    /**
     * Adds = filtering operation.
     * @method NumericField#equalTo
     * @param operand
     */
    p.equalTo = function (operand) {
        return this.getStringForOperation('=', operand);
    };

    /**
     * Adds > filtering operation.
     * @method NumericField#greaterThan
     * @param operand
     */
    p.greaterThan = function (operand) {
        return this.getStringForOperation('>', operand);
    };

    /**
     * Adds >= filtering operation.
     * @method NumericField#greaterThan
     * @param operand
     */
    p.greaterThanOrEqualTo = function (operand) {
        return this.getStringForOperation('>=', operand);
    };

    /**
     * Adds < filtering operation.
     * @method NumericField#lessThan
     * @param operand
     */
    p.lessThan = function (operand) {
        return this.getStringForOperation('<', operand);
    };

    /**
     * Adds <= filtering operation.
     * @method NumericField#lessThanOrEqualTo
     * @param operand
     */
    p.lessThanOrEqualTo = function (operand) {
        return this.getStringForOperation('<=', operand);
    };

})(typeof exports === 'undefined' ? this.kraken : exports);