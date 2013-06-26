/**
 * Abstract field with generic logic. Fields are used for sorting, filtering data also they represents entities data properties names.
 * @namespace kraken.fields
 * @class AbstractField
 */

function AbstractField(name) {
    this._name = name;
}

AbstractField.prototype.toString = function () {
    return this._name;
};

AbstractField.prototype._getStringForOperation = function (operator, operand) {
    return this._name + operator + operand;
};