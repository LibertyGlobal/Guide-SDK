/**
 * Core is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace kraken
 */

(function(w){
    w.kraken = w.kraken || {};
})(window);;/**
 * Utils is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace utils
 */

/**
 * @module utils
 */
(function(w){
    var utils = {

    };

    w.kraken.utils = utils;
})(window);;/**
 * Ajax is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace utils
 */

/**
 * Module for ajax, JSONP
 * @module ajax
 */
(function(w){
    var ajax = function(url, callback){

    };

    w.kraken.utils.ajax = ajax;
})(window);;/**
 * Utils is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace utils
 */

/**
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
};/**
 * Collection is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace kraken
 */

/**
 * Represents basic functionality for Kraken data sets
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
 * Entity is a part of Kraken API client library
 * Created : 6/18/13
 * @namespace kraken.queryBuildingLogic
 */

/**
 * Represents base query-building logic
 * @class kraken.QueryBuilderBase
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