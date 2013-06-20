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

    p.addOperation = function(operator, operand){
        this.operations.push({operator: operator, operand: operand});
    }

    p.getURLStrings = function(){
        var result = [];
        for (var i = 0; i < this.operations; i++){
            result.push(this.name + this.operations[i].operator + this.operations[i].operand);
        }
        return result;
    }

})(typeof exports === 'undefined'? this.kraken: exports);