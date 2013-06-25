/* exported NumericField */
/* global AbstractField: false */

/**
 * Numeric field supports math comparing functions.
 * @namespace kraken.fields
 * @class NumericField
 * @extends AbstractField
 */

function NumericField(name) {
    AbstractField.call(this, name);
}

NumericField.prototype = Object.create(AbstractField.prototype);

/**
 * Adds = filtering operation.
 * @method NumericField#equalTo
 * @param operand
 */
NumericField.prototype.equalTo = function (operand) {
    return this._getStringForOperation('=', operand);
};

/**
 * Adds > filtering operation.
 * @method NumericField#greaterThan
 * @param operand
 */
NumericField.prototype.greaterThan = function (operand) {
    return this._getStringForOperation('>', operand);
};

/**
 * Adds >= filtering operation.
 * @method NumericField#greaterThan
 * @param operand
 */
NumericField.prototype.greaterThanOrEqualTo = function (operand) {
    return this._getStringForOperation('>=', operand);
};

/**
 * Adds < filtering operation.
 * @method NumericField#lessThan
 * @param operand
 */
NumericField.prototype.lessThan = function (operand) {
    return this._getStringForOperation('<', operand);
};

/**
 * Adds <= filtering operation.
 * @method NumericField#lessThanOrEqualTo
 * @param operand
 */
NumericField.prototype.lessThanOrEqualTo = function (operand) {
    return this._getStringForOperation('<=', operand);
};