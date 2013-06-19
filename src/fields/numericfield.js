/**
 * @namespace fields
 * @class NumericField
 */

(function(exports){
    /**
     * @constructor
     * @arg name determines string representation of field
     */
    exports.NumericField = function(name){
        exports.AbstractField.call(this, name);
    }

    p = exports.NumericField.prototype = Object.create(exports.AbstractField.prototype);

})(typeof exports === 'undefined'? this.kraken: exports);