/**
 * Textual field supports equal and regexp matching.
 * @namespace kraken.fields
 * @class TextField
 * @extends AbstractField
 */

(function (kraken) {
    kraken.TextField = function (name) {
        kraken.AbstractField.call(this, name);
    }

    var p = kraken.TextField.prototype = Object.create(kraken.AbstractField.prototype);

    p.equalTo = function (operand) {
        return this.getStringForOperation('=', operand);
    }

    p.isMatching = function (operand) {
        return this.getStringForOperation('~', operand);
    }

})(typeof exports === 'undefined' ? this.kraken : exports);