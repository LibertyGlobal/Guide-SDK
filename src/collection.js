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

    p.where = function (conditionObject) {
        //TODO test
        var result = [];
        this.each(function (dataObject) {
            for (var i in conditionObject) {
                if (dataObject[i] === conditionObject[i]) {
                    result.push(dataObject[i]);
                }
            }
        })
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