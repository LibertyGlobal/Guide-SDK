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

    /**
     * Adds = filtering operation.
     * @method TextField#equalTo
     * @param operand
     */
    p.equalTo = function (operand) {
        return this.getStringForOperation('=', operand);
    }

    /**
     * Adds ~ filtering operation. Says to backend to filter records by regexp.
     * @method TextField#equalTo
     * @param operand
     */
    p.isMatching = function (operand) {
        return this.getStringForOperation('~', operand);
    }

})(typeof exports === 'undefined' ? this.kraken : exports);