// Kraken
// ----------------------------------
// v0.2.0
//
// Copyright (c) 2013 Liberty Global
// Distributed under BSD license

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.kraken = root.K = factory();
    }
}(this, function () {

    //Defining global namespace
    var kraken = {};
    
    //Defining shortcut for namespace
    var K = kraken;
    
    /**
     * @namespace utils
     * @module utils
     */
    
    K.utils = {
        addFactory: function (objectToProceed) {
            objectToProceed.create = function () {
                return new objectToProceed();
            }
        }
    };
    
    var jsonp = function () {
        var counter = 0, head, window = this, config = {};
    
        function load(url, pfnError) {
            var script = document.createElement('script'),
                done = false;
    
            script.src = url;
            script.async = true;
    
            var errorHandler = pfnError || config.error;
            if (typeof errorHandler === 'function') {
                script.onerror = function (ex) {
                    errorHandler({url: url, event: ex});
                };
            } else {
                console.warn('KrakenSDK: Error during request to ' + url);
            }
    
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if (script && script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                }
            };
    
            if (!head) {
                head = document.getElementsByTagName('head')[0];
            }
            head.appendChild(script);
        }
    
        function encode(str) {
            return encodeURIComponent(str);
        }
    
        function removeParameter(url, parameter) {
            var urlparts = url.split('?');
    
            if (urlparts.length >= 2) {
                var urlBase = urlparts.shift(); //get first part, and remove from array
                var queryString = urlparts.join("?"); //join it back up
    
                var prefix = encodeURIComponent(parameter) + '=';
                var pars = queryString.split(/[&;]/g);
                for (var i = pars.length; i-- > 0;) {            //reverse iteration as may be destructive
                    if (pars[i].lastIndexOf(prefix, 0) !== -1) {  //idiom for string.startsWith
                        pars.splice(i, 1);
                    }
                }
                url = urlBase + '?' + pars.join('&');
            }
            return url;
        }
    
        function jsonp(url, callback, callbackName) {
    
            var query = (url || '').indexOf('?') === -1 ? '?' : '&', key;
    
            callbackName = (callbackName || config.callbackName || 'callback');
            var uniqueName = callbackName + "_json" + (++counter);
    
            url = removeParameter(url, callbackName);
    
            window[ uniqueName ] = function (data) {
                callback(data);
                try {
                    delete window[ uniqueName ];
                } catch (e) {
                }
                window[ uniqueName ] = null;
            };
    
            load(url + query + callbackName + '=' + uniqueName);
            return uniqueName;
        }
    
        return jsonp;
    };
    
    var nodeRequest = function(){
        function nodeRequest(url, callback, errorCallback) {
            var http = require('http');
            var urlmodule = require('url');
    
            var urlData = urlmodule.parse(url, true);
    
            var options = {
                host: urlData.hostname,
                port: 80,
                method: 'GET',
                path: urlData.path
            };
    
            var temporaryCallback = function (res) {
                callback(res);
            }
    
            var reqGet = http.request(options, function (res) {
                res.on('data', function (d) {
                    temporaryCallback(JSON.parse(d));
                });
            });
    
            reqGet.end();
    
            reqGet.on('error', function(res){
                if (errorCallback){
                    errorCallback(res);
                } else {
                    console.warn('KrakenSDK: Error during request to ' + url);
                }
            });
        }
    
        return nodeRequest;
    };
    
    /**
     * Determines are we in NodeJS or not and returns right transport module.
     * @namespace kraken
     * @function kraken.requestTransport
     */
    
    var chooseTransport = function () {
        if (typeof module !== 'undefined' && module.exports) {
            return nodeRequest();
        } else {
            return jsonp();
        }
    };
    
    var requestTransport = chooseTransport();
    
    /**
     * Global variables
     * @namespace kraken.config
     */
    
    K.config = {
        /**
         * Represents URL of Kraken REST server.
         * @const kraken.config.APIURL
         */
        APIURL: 'http://appdev.io/kraken/v2/schedule/',
        /**
         * Represents URL of Kraken REST server.
         * @const kraken.config.region
         */
        region: ''
    };
    
    /**
     * Request is a class which is designed to be used as a property of entity to communicate with server and remember state of data transfer
     * @namespace kraken
     * @class Request
     */
    
    function Request() {
        //Initial request URL needed to make items observable and fire onChange event of entity
        //noinspection JSUnusedGlobalSymbols
        this.initialRequestURL = '';
        this.nextBatchLink = '';
    }
    
    Request.prototype.execute = function (URL, callback, nextBatchSteps) {
        var pipelineData = [];
    
        //noinspection JSUnusedGlobalSymbols
        this.initialRequestURL = URL;
    
        requestTransport(URL, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
    };
    
    Request.prototype.proceedResponse = function (response, nextBatchSteps, pipelineData, callback) {
        pipelineData = pipelineData.concat(response.data);
    
        if (response.nextBatchLink) {
            this.nextBatchLinkURL = response.nextBatchLink.href;
        }
    
        if (nextBatchSteps !== undefined) {
            nextBatchSteps--;
        }
    
        if ((nextBatchSteps > 0 || nextBatchSteps === undefined) && this.nextBatchLinkURL) {
            requestTransport(this.nextBatchLinkURL, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
        } else {
            callback.bind(this)(pipelineData);
        }
    };
    
    Request.prototype.createScopedCallback = function (callback, nextBatchSteps, pipelineData) {
        var scopedCallback = function (data) {
            this.proceedResponse(data, nextBatchSteps, pipelineData, callback);
        };
    
        return scopedCallback.bind(this);
    };
    
    /**
     * Abstract field with generic logic. Fields are used for sorting, filtering data also they represents entities data properties names.
     * @namespace kraken.fields
     * @class AbstractField
     */
    
    function AbstractField(name) {
        this._name = name;
    }
    
    AbstractField.prototype.toString = function () {
        return this._name;
    };
    
    AbstractField.prototype._getStringForOperation = function (operator, operand) {
        return this._name + operator + operand;
    };
    
    /**
     * Numeric field supports math comparing functions.  Fields are used for sorting, filtering data also they represents entities data properties names.
     * @namespace kraken.fields
     * @class NumericField
     * @extends AbstractField
     */
    
    function NumericField(name) {
        AbstractField.call(this, name);
    }
    
    NumericField.prototype = Object.create(AbstractField.prototype);
    
    /**
     * Adds = filtering operation.
     * @method NumericField#equalTo
     * @param operand
     */
    NumericField.prototype.equalTo = function (operand) {
        return this._getStringForOperation('=', operand);
    };
    
    /**
     * Adds > filtering operation.
     * @method NumericField#greaterThan
     * @param operand
     */
    NumericField.prototype.greaterThan = function (operand) {
        return this._getStringForOperation('>', operand);
    };
    
    /**
     * Adds >= filtering operation.
     * @method NumericField#greaterThan
     * @param operand
     */
    NumericField.prototype.greaterThanOrEqualTo = function (operand) {
        return this._getStringForOperation('>=', operand);
    };
    
    /**
     * Adds < filtering operation.
     * @method NumericField#lessThan
     * @param operand
     */
    NumericField.prototype.lessThan = function (operand) {
        return this._getStringForOperation('<', operand);
    };
    
    /**
     * Adds <= filtering operation.
     * @method NumericField#lessThanOrEqualTo
     * @param operand
     */
    NumericField.prototype.lessThanOrEqualTo = function (operand) {
        return this._getStringForOperation('<=', operand);
    };
    
    /**
     * Textual field supports equal and regexp matching.  Fields are used for sorting, filtering data also they represents entities data properties names.
     * @namespace kraken.fields
     * @class TextField
     * @extends AbstractField
     * @tutorial Typical case for using TextField is to find broadcasts in particular category. This will look like
     */
    
    function TextField(name) {
        AbstractField.call(this, name);
    }
    
    TextField.prototype = Object.create(AbstractField.prototype);
    
    /**
     * Adds = filtering operation.
     * @method TextField#equalTo
     * @param operand
     */
    TextField.prototype.equalTo = function (operand) {
        return this._getStringForOperation('=', operand);
    };
    
    /**
     * Adds ~ filtering operation. Says to backend to filter records by regexp.
     * @method TextField#equalTo
     * @param operand
     */
    TextField.prototype.isMatching = function (operand) {
        return this._getStringForOperation('~', operand);
    };
    
    /**
     * Represents basic functionality for Kraken data sets.
     *
     * @namespace kraken
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
     * Represents base query-building logic
     * @namespace kraken
     * @class EntityBase
     * @extends Collection
     */
    
    function EntityBase() {
        Collection.call(this);
    
        this._queryStringElements = [];
        this._requestURL = '';
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
    
        if (order === 'asc' || order === 'desc') {
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
        this._requestURL += this._queryStringElements.join('&');
    
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
    
    /**
     * Class describes broadcast-specific fields and request logic
     * @namespace kraken.entities
     * @class Broadcast
     * @extends EntityBase
     */
    
    K.Broadcast = function () {
        EntityBase.call(this);
    };
    
    K.Broadcast.ID = new TextField('id');
    K.Broadcast.TITLE = new TextField('title');
    K.Broadcast.CATEGORY = new TextField('category');
    K.Broadcast.EPISODE = new NumericField('episode');
    K.Broadcast.SYNOPSIS = new TextField('synopsis');
    K.Broadcast.START = new NumericField('start');
    K.Broadcast.END = new NumericField('end');
    K.Broadcast.YEAR = new TextField('year');
    K.Broadcast.VIDEO_ID = new TextField('videoId');
    K.Broadcast.SELF_LINK = new TextField('selfLink');
    K.Broadcast.MORE_LINK = new TextField('moreLink');
    K.Broadcast.OPENGRAPH_LINK = new TextField('opengraphLink');
    
    K.Broadcast.prototype = Object.create(EntityBase.prototype);
    K.Broadcast.prototype._baseURL = 'broadcasts.json?';
    
    K.utils.addFactory(K.Broadcast);
    /**
     * Class describes channel-specific fields and request logic
     * @namespace kraken.entities
     * @class Channel
     * @extends EntityBase
     */
    
    K.Channel = function () {
        EntityBase.call(this);
    };
    
    K.Channel.ID = new TextField('id');
    K.Channel.NAME = new TextField('name');
    K.Channel.LOGICAL_POSITION = new NumericField('logicalPosition');
    K.Channel.SELF_LINK = new TextField('selfLink');
    K.Channel.BROADCASTS_LINK = new TextField('broadcastsLink');
    K.Channel.OPENGRAPH_LINK = new TextField('opengraphLink');
    
    K.utils.addFactory(K.Channel);
    
    K.Channel.prototype = Object.create(EntityBase.prototype);
    K.Channel.prototype._baseURL = 'channels.json?';
    /**
     * Encapsulates Region-specific fields and request logic
     * @namespace kraken.entities
     * @class Region
     * @extends EntityBase
     */
    K.Region = function () {
        EntityBase.call(this);
    };
    
    K.Region.ID = new TextField('id');
    K.Region.NAME = new TextField('name');
    K.Region.CHANNEL_LINEUP_LINK = new TextField('channelLineupLink');
    K.Region.SELF_LINK = new TextField('selfLink');
    K.Region.TOP_BROADCASTS_LINK = new TextField('topBroadcastsLink');
    K.Region.TOP_VIDEOS_LINK = new TextField('topVideosLink');
    
    K.utils.addFactory(K.Region);
    
    K.Region.prototype = Object.create(EntityBase.prototype);
    K.Region.prototype._baseURL = 'regions.json?';

    return K;

}));