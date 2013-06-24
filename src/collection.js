/**
 * Represents basic functionality for Kraken data sets.
 *
 * @namespace kraken
 * @class Collection
 */

(function (kraken) {

    kraken.Collection = function (items) {
        this.items = [];

        if (typeof items !== 'undefined') {
            this.add(items);
        }
    };

    var p = kraken.Collection.prototype;

    /**
     * Applies function to every element in collection.
     * @method Collection#each
     * @param functionToApply Function to apply to elements.
     */
    p.each = function (functionToApply) {
        this.items.forEach(functionToApply);
    };

    /**
     * Returns all records which matches conditionalObject. For example if it is {a: 1} - method will return only objects from collection where 'a' property is present and is equal to 1
     * @method Collection#where
     * @param {Object} filter Filter descriptor object.
     */
    p.where = function (filter) {
        var keys = Object.keys(filter);

        return this.items.filter(function (item) {
            return keys.every(function (key) {
                return item.hasOwnProperty(key) && item[key] === filter[key];
            });
        });
    };

    /**
     * Adds object or array to collection.
     * @method Collection#add
     * @param {Object|Array} objectToAdd Object or array to add to collection.
     */
    p.add = function (objectToAdd) {
        if (Array.isArray(objectToAdd)) {
            this.items = this.items.concat(objectToAdd);
        } else {
            this.items.push(objectToAdd);
        }
    };

    /**
     * Retrieves collection item by index.
     * @method Collection#get
     * @param {Number} index Index of object to retrieve from collection.
     */
    p.get = function (index) {
        return this.items[index];
    };

    p.toArray = function () {
        return this.items.slice(0);
    };

})(typeof exports === 'undefined' ? this.kraken : exports);