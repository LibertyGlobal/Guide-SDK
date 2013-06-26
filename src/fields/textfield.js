/**
 * Textual field supports equal and regexp matching.  Fields are used for sorting, filtering data also they represents entities data properties names.
 * @namespace kraken.fields
 * @class TextField
 * @extends AbstractField
 * @tutorial Typical case for using TextField is to find broadcasts in particular category. This will look like
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