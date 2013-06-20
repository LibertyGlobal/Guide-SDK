/**
 * @namespace fields
 * @class TextField
 */

(function(kraken){
    /**
     * @constructor
     * @param name determines string representation of field
     */
    kraken.TextField = function(name){
        kraken.AbstractField.call(this, name);
    }

    var p = kraken.TextField.prototype = Object.create(kraken.AbstractField.prototype);

    p.equalTo = function(operand){
        this.getStringForOperation('=', operand);
    }

    p.isMatching = function(operand){
        this.getStringForOperation('~', operand);
    }

})(typeof exports === 'undefined'? this.kraken: exports);