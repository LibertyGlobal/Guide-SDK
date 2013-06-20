/**
 * Represents base query-building logic
 * @namespace kraken
 * @class EntityBase
 * @extends Collection
 */

(function (kraken) {
    kraken.EntityBase = function () {
        kraken.Collection.call(this);
        this.URLelements = [];
        this.requestURL = '';
        this.baseURL = '';
        this.request = new kraken.Request();
    }

    var p = kraken.EntityBase.prototype = Object.create(kraken.Collection.prototype);

    /**
     * Adds limitation to response data length. For example "a.limit(10);"
     * @method kraken.EntityBase#limit
     * @param {number} limitTo Number of maximum data elements in response.
     */
    p.limit = function (limitTo) {
        this.addURLElement('maxBatchSize=' + limitTo);
    }

    /**
     * Determines list of fields to be retrieved from server. For example by "a.shows(kraken.channel.id, kraken.channel.name);"
     * @method kraken.EntityBase#fields
     * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
     */
    p.fields = function (multipleArgs) {
        this.addURLElement('show=');
        for (var i = 0; i < arguments.length; i++) {
            this.addURLElement(arguments[i]);
        }
    }

    /**
     * Sets sorting field and method. For example "a.sort(kraken.broadcast.startTime);"
     * @method kraken.EntityBase#sort
     * @param {string} field Field to sort records by.
     * @param {string} [method="asc"] Determines method we want to sort records with - ascendant (asc) or descendant (desc).
     */
    p.sort = function (field, method) {
        if (method === undefined) {
            method = 'asc';
        }

        this.addURLElement('sort=' + field + '(' + method + ')');
    }

    /**
     * Filters data by some of entity properties. For example "a.filter(kraken.channel.id.equalTo(1));"
     * @method kraken.EntityBase#filter
     * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
     */
    p.filter = function (multipleArgs) {
        for (var i = 0; i < arguments.length; i++) {
            this.addURLElement(arguments[i]);
        }
    }

    p.addURLElement = function (URLElement) {
        this.URLelements.push(URLElement);
    }

    p.buildURLFromElements = function () {
        this.requestURL = kraken.config.APIURL;
        this.requestURL += this.baseURL;

        for (var i = 0; i < this.URLelements.length; i++) {
            this.requestURL += this.URLelements[i];
            if (i < this.URLelements.length - 1) {
                this.requestURL += '&';
            }
        }

        return this.requestURL;
    }

    p.processData = function (data) {
        this.add(data.data);
    }

    p.createScopedCallback = function (callback) {
        var scopedCallback = function(data){
            this.processData(data);
            callback.bind(this)(data);
        }

        return scopedCallback.bind(this);
    }

    p.one = function (callback) {
        this.buildURLFromElements();
        this.request.execute(this.requestURL, this.createScopedCallback(callback), 1);
    }

    p.next = function (callback) {
        this.request.execute(this.request.nextBatchLink || this.buildURLFromElements(), this.createScopedCallback(callback), 1);
    }

    p.all = function (callback) {
        this.buildURLFromElements();
        this.request.execute(this.requestURL, this.createScopedCallback(callback), 0);
    }

})(typeof exports === 'undefined' ? this.kraken : exports);