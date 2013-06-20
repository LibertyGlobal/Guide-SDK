/**
 * @namespace fields
 * @class NumericField
 */

(function(kraken){
    /**
     * @constructor
     * @param name determines string representation of field
     */
    kraken.NumericField = function(name){
        kraken.AbstractField.call(this, name);
    }

    var p = kraken.NumericField.prototype = Object.create(kraken.AbstractField.prototype);

    p.equalTo = function(operand){
        this.getStringForOperation('=', operand);
    }

    p.greaterThan = function(operand){
        this.getStringForOperation('>', operand);
    }

    p.lessThan = function(operand){
        this.getStringForOperation('<', operand);
    }

})(typeof exports === 'undefined'? this.kraken: exports);