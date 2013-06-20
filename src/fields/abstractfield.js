/**
 * Abstract field with generic logic.
 * @namespace kraken.fields
 * @class AbstractField
 */

(function (kraken) {
    kraken.AbstractField = function (name) {
        this.name = name;
        this.operations = [];
    }

    var p = kraken.AbstractField.prototype;

    p.toString = function () {
        return this.name;
    }

    p.getStringForOperation = function (operator, operand) {
        return this.name + operator + operand;
    }
})(typeof exports === 'undefined' ? this.kraken : exports);