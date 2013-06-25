/**
 * Represents base query-building logic
 * @namespace kraken
 * @class EntityBase
 * @extends Collection
 */

function EntityBase() {
    Collection.call(this);

    this._queryStringElements = [];
    this._requestURL = '';
    this._baseURL = '';
    this._request = new Request();
}

EntityBase.prototype = Object.create(Collection.prototype);

/**
 * Adds limitation to response data length. For example "a.limit(10);"
 * @method EntityBase#limit
 * @param {number} limitTo Number of maximum data elements in response.
 */
EntityBase.prototype.limit = function (limitTo) {
    this._addURLElement('maxBatchSize=' + limitTo);

    return this;
};

/**
 * Determines list of fields to be retrieved from server. For example by "a.shows(kraken.channel.id, kraken.channel.name);"
 * @method EntityBase#fields
 * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
 */
EntityBase.prototype.fields = function (multipleArgs) {
    this._addURLElement('show=' + Array.prototype.slice.call(arguments).join(','));

    return this;
};

/**
 * Sets sorting field and order. For example "a.sort(kraken.broadcast.startTime);"
 * @order EntityBase#sort
 * @param {string} field Field to sort records by.
 * @param {string} [order="asc"] Determines order we want to sort records with - ascendant (asc) or descendant (desc).
 */
EntityBase.prototype.sort = function (field, order) {
    if (typeof order === 'undefined' || order === null) {
        order = 'asc';
    }

    if (order == 'asc' || order == 'desc') {
        this._addURLElement('sort=' + field + '(' + order + ')');
    } else {
        throw new Error('Invalid sort option, expecting "asc" or "desc"');
    }

    return this;
};

/**
 * Filters data by some of entity properties. For example "a.filter(kraken.channel.id.equalTo(1));"
 * @method EntityBase#filter
 * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
 */
EntityBase.prototype.filter = function (multipleArgs) {
    for (var i = 0; i < arguments.length; i++) {
        this._addURLElement(arguments[i]);
    }
    return this;
};

/**
 * Retrieves one page of data.
 * @method EntityBase#findOne
 * @param {Function} callback Callback to execute and pass response to.
 */
EntityBase.prototype.findOne = function (callback) {
    this._buildURLFromElements();
    this._request.execute(this._requestURL, this._createScopedCallback(callback), 1);
    return this;
};

/**
 * Retrieves next page of data.
 * @method EntityBase#findNext
 * @param {Function} callback Callback to execute and pass response to.
 */
EntityBase.prototype.findNext = function (callback) {
    this._request.execute(this._request.nextBatchLink || this._buildURLFromElements(), this._createScopedCallback(callback), 1);
    return this;
};

/**
 * Retrieves all pages of data one by one and then executes callback.
 * @method EntityBase#findAll
 * @param {Function} callback Callback to execute and pass response to.
 */
EntityBase.prototype.findAll = function (callback) {
    this._buildURLFromElements();
    this._request.execute(this._requestURL, this._createScopedCallback(callback));
    return this;
};

EntityBase.prototype._addURLElement = function (URLElement) {
    this._queryStringElements.push(URLElement);
};

EntityBase.prototype._buildURLFromElements = function () {
    this._requestURL = K.config.APIURL;

    if (K.config.region !== '') {
        this._requestURL += 'regions/' + K.config.region + '/';
    }

    this._requestURL += this._baseURL;

    for (var i = 0; i < this._queryStringElements.length; i++) {
        this._requestURL += this._queryStringElements[i];
        if (i < this._queryStringElements.length - 1) {
            this._requestURL += '&';
        }
    }

    return this._requestURL;
};

EntityBase.prototype._processData = function (data) {
    this.add(data);
};

EntityBase.prototype._createScopedCallback = function (callback) {
    var scopedCallback = function (data) {
        this._processData(data);
        callback.bind(this)(data);
    };

    return scopedCallback.bind(this);
};