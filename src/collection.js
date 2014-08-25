/**
 * Represents basic functionality for Kraken data sets.
 *
 * @namespace LGI.Guide
 * @class Collection
 */

function Collection(items) {
    this.items = [];

    if (typeof items !== 'undefined') {
        this.add(items);
    }
}

/**
 * Applies function to every element in collection.
 * @method Collection#each
 * @param functionToApply Function to apply to elements.
 */
Collection.prototype.each = function (functionToApply) {
    this.items.forEach(functionToApply);
};

/**
 * Returns all records which matches conditionalObject. For example if it is {a: 1} - method will return only objects from collection where 'a' property is present and is equal to 1
 * @method Collection#where
 * @param {Object} filter Filter descriptor object.
 */
Collection.prototype.where = function (filter) {
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
Collection.prototype.add = function (objectToAdd) {
    if (Object.prototype.toString.call(objectToAdd) === '[object Array]') {
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
Collection.prototype.get = function (index) {
    return this.items[index];
};

/**
 * Returns data as array.
 * @method Collection#toArray
 */
Collection.prototype.toArray = function () {
    return this.items.slice(0);
};


/**
 * Resets data.
 * @method Collection#reset
 */
Collection.prototype.reset = function () {
    this.items = [];
    return this.items;
};