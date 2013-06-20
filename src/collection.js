/**
 * Represents basic functionality for Kraken data sets
 * @namespace kraken
 * @class Collection
 */

(function (kraken) {
    kraken.Collection = function () {
        this.items = [];
    }

    var p = kraken.Collection.prototype;

    p.each = function (functionToApply) {
        for (var i = 0; i < this.items.length; i++) {
            functionToApply.apply(this, [this.items[i], i]);
        }
    }

    p.where = function (conditionString) {

    }

    p.add = function (objectToAdd) {
        if (objectToAdd instanceof Array) {
            this.items = this.items.concat(objectToAdd);
        } else {
            this.items.push(objectToAdd);
        }
    }

    p.get = function (index) {
        return this.items[index];
    }
})(typeof exports === 'undefined' ? this.kraken : exports);