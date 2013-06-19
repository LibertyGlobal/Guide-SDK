/**
 * Represents base query-building logic
 * @namespace kraken
 */


//Creating window.kraken namespace if we are not in Node JS module
if (typeof exports === 'undefined'){
    this.kraken = {};
};/**
 * @namespace utils
 * @module utils
 */

(function(w){
    var utils = {

    };

    w.kraken.utils = utils;
})(window);;/**
 * Module for ajax, JSONP
 * @namespace utils
 * @module ajax
 */
(function(w){
    var ajax = function(url, callback){

    };

    w.kraken.utils.ajax = ajax;
})(window);;/**
 * @namespace utils
 * @module polyfills
 */

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

if (!Object.create) {
    Object.create = (function(){
        function F(){}

        return function(o){
            if (arguments.length != 1) {
                throw new Error('Object.create implementation only accepts one parameter.');
            }
            F.prototype = o
            return new F()
        }
    })()
};/**
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

})(typeof exports === 'undefined'? this.kraken: exports);;/**
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

})(typeof exports === 'undefined'? this.kraken: exports);;;/**
 * Represents basic functionality for Kraken data sets
 * @namespace kraken
 * @class Collection
 */
(function(w){
    var Collection = function(){

        this.selfURL = undefined;
        this.filter = undefined;
        this.nextFetchLink = undefined;
    };

    p = Collection.prototype;

    p.each = function(functionToApply){
        for (var i = 0; i < this.items.length; i++){
            functionToApply.apply(i, this.items[i]);
        }
    };

    w.kraken.Collection = Collection;
})(window);;/**
 * Represents base query-building logic
 * @namespace kraken
 * @class kraken.EntityBase
 */
;/**
 * Country is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace kraken.queryBuildingLogic
 */


/**
 * Class describes country-specific fields and request logic
 * @class Country
 */
(function(w){

})(window);;/**
 * City is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace kraken.queryBuildingLogic
 */


/**
 * Class describes city-specific fields and request logic
 * @class kraken.City
 */
(function(w){

})(window);;/**
 * Channel is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace kraken.queryBuildingLogic
 */


/**
 * Class describes channel-specific fields and request logic
 * @class Channel
 */
(function(w){

})(window);;/**
 * Broadcast is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace kraken.queryBuildingLogic
 */


/**
 * Class describes broadcast-specific fields and request logic
 * @class Broadcast
 */
(function(w){

})(window);