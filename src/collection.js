/**
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
})(window);