/**
 * @namespace fields
 * @class AbstractField
 */

(function(exports){
    /**
     * @constructor
     * @arg name determines string representation of field
     */
    exports.AbstractField = function(name){
        this.name = name;
    }

    p = AbstractField.prototype;

    p.toString = function(){
        return this.name;
    }

})(typeof exports === 'undefined'? this.kraken: exports);