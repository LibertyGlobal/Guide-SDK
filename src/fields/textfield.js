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

    p = kraken.TextField.prototype = Object.create(kraken.AbstractField.prototype);

    p.equalTo = function(operand){
        this.addOperation('=', operand);
    }

    p.isMatching = function(operand){
        this.addOperation('~', operand);
    }

})(typeof exports === 'undefined'? this.kraken: exports);