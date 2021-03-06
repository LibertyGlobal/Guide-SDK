/**
 * Numeric field supports math comparing functions.  Fields are used for sorting, filtering data also they represents entities data properties names.
 * @namespace LGI.Guide.fields
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