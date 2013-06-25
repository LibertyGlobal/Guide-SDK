/* exported TextField */
/* global AbstractField: false */

/**
 * Textual field supports equal and regexp matching.
 * @namespace kraken.fields
 * @class TextField
 * @extends AbstractField
 */

function TextField(name) {
    AbstractField.call(this, name);
}

TextField.prototype = Object.create(AbstractField.prototype);

/**
 * Adds = filtering operation.
 * @method TextField#equalTo
 * @param operand
 */
TextField.prototype.equalTo = function (operand) {
    return this._getStringForOperation('=', operand);
};

/**
 * Adds ~ filtering operation. Says to backend to filter records by regexp.
 * @method TextField#equalTo
 * @param operand
 */
TextField.prototype.isMatching = function (operand) {
    return this._getStringForOperation('~', operand);
};