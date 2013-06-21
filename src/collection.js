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

    /**
     * Applies function to every element in collection.
     * @method Collection#each
     * @param functionToApply Function to apply to elements.
     */
    p.each = function (functionToApply) {
        for (var i = 0; i < this.items.length; i++) {
            functionToApply.apply(this, [this.items[i], i]);
        }
    }

    /**
     * Returns all records which matches conditionalObject. For example if it is {a: 1} - method will return only objects from collection where 'a' property is present and is equal to 1
     * @method Collection#where
     * @param conditionalObject Object to match.
     */
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

    /**
     * Adds object or array to collection.
     * @method Collection#add
     * @param {Object|Array} objectToAdd Object or array to add to collection.
     */
    p.add = function (objectToAdd) {
        if (objectToAdd instanceof Array) {
            this.items = this.items.concat(objectToAdd);
        } else {
            this.items.push(objectToAdd);
        }
    }

    /**
     * Retrieves collection item by index.
     * @method Collection#get
     * @param {Number} index Index of object to retrieve from collection.
     */
    p.get = function (index) {
        return this.items[index];
    }
})(typeof exports === 'undefined' ? this.kraken : exports);