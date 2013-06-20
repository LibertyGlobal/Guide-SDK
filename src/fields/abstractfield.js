/**
 * @namespace fields
 * @class AbstractField
 */

(function(kraken){
    /**
     * @constructor
     * @arg name determines string representation of field
     */
    kraken.AbstractField = function(name){
        this.name = name;
        this.operations = [];
    }

    var p = kraken.AbstractField.prototype;

    p.toString = function(){
        return this.name;
    }

    p.getStringForOperation = function(operator, operand){
        return this.name + operator + operand;
    }
})(typeof exports === 'undefined'? this.kraken: exports);