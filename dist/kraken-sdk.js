// Kraken SDK
// ----------------------------------
// v0.2.7
//
// Copyright (c) 2014 Liberty Global
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
                script.onerror = function (ex) {
                    console.warn('KrakenSDK: Error during request to ' + url);
                };
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
    
    var nodeRequest = function () {
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
    
            var reqGet = http.request(options, function (res) {
                res.on('data', function (d) {
                    callback(JSON.parse(d));
                });
            });
    
            reqGet.end();
    
            reqGet.on('error', function (res) {
                if (errorCallback) {
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
        APIURL: '//lgi.io/kraken/v2/schedule/',
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
        } else {
            this.nextBatchLinkURL = undefined;
        }
    
        if (nextBatchSteps !== undefined) {
            nextBatchSteps--;
        }
    
        if ((nextBatchSteps > 0 || nextBatchSteps === undefined) && this.nextBatchLinkURL !== undefined) {
            requestTransport(this.nextBatchLinkURL, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
        } else {
            callback.bind(this)(pipelineData, response);
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
    
    AbstractField.prototype._getURLModificationObject = function (actionFunction, stringValue) {
        var result = {};
        result.stringValue = stringValue;
        result.context = this;
        result.actionFunction = actionFunction;
        return result;
    }
    
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
     * @tutorial Typical case for using TextField is to find broadcasts in particular category.
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
     * Prepend field differs from other fields with it`s behaviour on filtering. Instead of being added to the arguments of request this field should be added to URL path.
     * @namespace kraken.fields
     * @class PrependField
     * @extends AbstractField
     * @tutorial Typical case for using PrependField is to find broadcasts by ChannelIds.
     */
    
    function PrependField(name, prefixString) {
        AbstractField.call(this, name);
        this.prefixString = prefixString;
    }
    
    PrependField.prototype = Object.create(AbstractField.prototype);
    
    /**
     * Adds = filtering operation.
     * @method PrependField#equalTo
     * @param operand
     */
    PrependField.prototype.equalTo = function (operand) {
        return this._getURLModificationObject(this._modifyURL, operand);
    };
    
    PrependField.prototype._modifyURL = function (URL, stringValue) {
        var lastSlashIndex = URL.lastIndexOf('/');
        var processedValue = '/' + this.prefixString + '/' + stringValue;
        URL = URL.substr(0, lastSlashIndex) + processedValue + URL.substr(lastSlashIndex);
        return URL;
    }
    
    /**
     * Root changing field differs from other fields with it`s behaviour on filtering. Instead of being added to the arguments of request this field should be added as root like /broadcasts/1z,2z.json
     * @namespace kraken.fields
     * @class PrependField
     * @extends AbstractField
     * @tutorial Typical case for using PrependField is to find broadcast by ID.
     */
    
    function RootChangingField(name, prefixString) {
        AbstractField.call(this, name);
        this.prefixString = prefixString;
    }
    
    RootChangingField.prototype = Object.create(AbstractField.prototype);
    
    /**
     * Adds = filtering operation.
     * @method PrependField#equalTo
     * @param operand
     */
    RootChangingField.prototype.equalTo = function (operand) {
        return this._getURLModificationObject(this._modifyURL, operand);
    };
    
    RootChangingField.prototype._modifyURL = function (URL, stringValue) {
        var questionSymbolIndex = URL.indexOf('?') !== -1 ? URL.indexOf('?') : URL.length;
        var pathOfURL = URL.substring(0, questionSymbolIndex);
        var pathWithoutFileName = URL.substring(0, pathOfURL.lastIndexOf('/'));
        var processedValue = '/' + this.prefixString + '/' + stringValue + '.json';
    
        return URL.replace(pathOfURL, pathWithoutFileName + processedValue);
    }
    
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
     * Resets data.
     * @method Collection#reset
     */
    Collection.prototype.reset = function () {
        this.items = [];
        return this.items;
    };
    
    /**
     * Represents base query-building logic
     * @namespace kraken
     * @class EntityBase
     * @extends Collection
     */
    
    function EntityBase() {
        Collection.call(this);
    
        this.filters = [];
        this._queryModificationActions = [];
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
        this._addURLModification('maxBatchSize=' + limitTo);
    
        return this;
    };
    
    /**
     * Determines list of fields to be retrieved from server. For example by "a.shows(kraken.channel.id, kraken.channel.name);"
     * @method EntityBase#fields
     * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
     */
    EntityBase.prototype.fields = function (multipleArgs) {
        this._addURLModification('show=' + Array.prototype.slice.call(arguments).join(','));
    
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
            this._addURLModification('sort=' + field + '(' + order + ')');
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
            this._addURLModification(arguments[i]);
            this.filters.push(arguments[i]);
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
    
    EntityBase.prototype._addURLModification = function (modificationObject) {
        this._queryModificationActions.push(modificationObject);
    };
    
    EntityBase.prototype._buildURLFromElements = function () {
        this._requestURL = K.config.APIURL;
    
        if (this._URLprefix !== undefined) {
            this._requestURL += this._URLprefix;
        }
    
        if (K.config.region !== '') {
            this._requestURL += K.config.region + '/';
        }
    
        this._requestURL += this._baseURL;
    
        for (var i = 0; i < this._queryModificationActions.length; i++){
            //If processing is an action object - execute actionFunction on current URL
            if (this._queryModificationActions[i].actionFunction){
                this._requestURL = this._executeModificationAction(this._queryModificationActions[i]);
            } else {
                //If this is just a string - concat
                var joinSymbol = '&';
                if (i === 0){
                    joinSymbol = '';
                }
                this._requestURL += joinSymbol + this._queryModificationActions[i];
            }
        }
    
        return this._requestURL;
    };
    
    EntityBase.prototype._executeModificationAction = function(actionObject){
        return actionObject.actionFunction.apply(actionObject.context, [this._requestURL, actionObject.stringValue]);
    }
    
    EntityBase.prototype._processData = function (data) {
        this.add(data);
    };
    
    EntityBase.prototype._processResponse = function (response) {
        this.filters = response.filter || this.filters;
        this.sortings = response.order || this.sortings;
    };
    
    EntityBase.prototype._createScopedCallback = function (callback) {
        var scopedCallback = function (data, response) {
            this._processData(data);
            this._processResponse(response);
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
        if (kraken.config.region === undefined) {
            console.warn('Please, specify region before sending requests to Broadcasts endpoint.');
        }
    };
    
    K.Broadcast.ID = new RootChangingField('id', 'broadcasts');
    K.Broadcast.START = new NumericField('start');
    K.Broadcast.END = new NumericField('end');
    K.Broadcast.CRID = new TextField('video.crid');
    K.Broadcast.IMI = new TextField('imi');
    K.Broadcast.CHANNEL = new TextField('channel');
    K.Broadcast.CHANNEL_NAME = new TextField('channel.name');
    //K.Broadcast.CHANNEL_REF = new PrependField('channel.ref', 'channels');
    //K.Broadcast.STATISTICS = new TextField('video.statistics');
    K.Broadcast.VIDEO_ID = new TextField('video.id');
    K.Broadcast.TITLE = new TextField('video.title');
    K.Broadcast.SYNOPSIS = new TextField('video.synopsis');
    K.Broadcast.AGE_RATING = new TextField('video.ageRating');
    K.Broadcast.CATEGORY = new TextField('video.category');
    //K.Broadcast.OPENGRAPH_LINK = new TextField('video.opengraphLink');
    K.Broadcast.RECORD_LINK = new TextField('video.recordLink');
    //K.Broadcast.SELF_LINK = new TextField('selfLink');
    K.Broadcast.CAST = new TextField('video.cast');
    K.Broadcast.DIRECTORS = new TextField('video.directors');
    K.Broadcast.WRITERS = new TextField('video.writers');
    //K.Broadcast.EPISODE = new NumericField('episode');
    //K.Broadcast.SEASON = new NumericField('season');
    K.Broadcast.IMAGE_LINK = new NumericField('video.imageLink');
    K.Broadcast.BPM = new NumericField('statistics.bpm');
    K.Broadcast.POPULARITY = new NumericField('statistics.popularity');
    //K.Broadcast.MORE_LINK = new TextField('moreLink');
    
    K.utils.addFactory(K.Broadcast);
    
    K.Broadcast.prototype = Object.create(EntityBase.prototype);
    K.Broadcast.prototype._baseURL = 'broadcasts.json?';
    K.Broadcast.prototype._URLprefix = 'data/';
    /**
     * Class describes channel-specific fields and request logic
     * @namespace kraken.entities
     * @class Channel
     * @extends EntityBase
     */
    
    K.Channel = function () {
        EntityBase.call(this);
        if (kraken.config.region === undefined) {
            console.warn('Please, specify region before sending requests to Channel endpoint.');
        }
    };
    
    K.Channel.REF = new TextField('ref');
    K.Channel.NAME = new TextField('name');
    K.Channel.LOGICAL_POSITION = new NumericField('logicalPosition');
    K.Channel.LOGO_LINK = new TextField('logoLink');
    K.Channel.BROADCASTS_LINK = new TextField('broadcastsLink');
    K.Channel.OPENGRAPH_LINK = new TextField('opengraphLink');
    K.Channel.SELF_LINK = new TextField('selfLink');
    K.Channel.GENRES = new TextField('genres');
    K.Channel.BROADCASTS = new TextField('broadcasts');
    
    K.utils.addFactory(K.Channel);
    
    K.Channel.prototype = Object.create(EntityBase.prototype);
    K.Channel.prototype._baseURL = 'channels.json?';
    K.Channel.prototype._URLprefix = 'data/';
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
    K.Region.SUBREGIONS = new TextField('subregions');
    K.Region.GENRES = new TextField('genres');
    K.Region.CATEGORIES = new TextField('categories');
    K.Region.CHANNEL_LINEUP_LINK = new TextField('channelLineupLink');
    K.Region.SELF_LINK = new TextField('selfLink');
    K.Region.TOP_BROADCASTS_LINK = new TextField('topBroadcastsLink');
    K.Region.TOP_VIDEOS_LINK = new TextField('topVideosLink');
    
    K.utils.addFactory(K.Region);
    
    K.Region.prototype = Object.create(EntityBase.prototype);
    K.Region.prototype._baseURL = 'regions.json?';
    /**
     * Class describes video-specific fields and request logic
     * @namespace kraken.entities
     * @class Video
     * @extends EntityBase
     */
    
    K.Video = function () {
        EntityBase.call(this);
        if (kraken.config.region === undefined) {
            console.warn('Please, specify region before sending requests to Video endpoint.');
        }
    };
    
    K.Video.ID = new RootChangingField('id', 'videos');
    K.Video.TITLE = new TextField('title');
    K.Video.SYNOPSIS = new TextField('synopsis');
    K.Video.CATEGORY = new TextField('category');
    K.Video.SEASON = new NumericField('season');
    K.Video.EPISODE = new NumericField('episode');
    K.Video.CRID = new TextField('crid');
    K.Video.STATISTICS = new TextField('statistics');
    K.Video.AGE_RATING = new TextField('ageRating');
    K.Video.IMAGE_LINK = new TextField('imageLink');
    K.Video.OPENGRAPH_LINK = new TextField('opengraphLink');
    K.Video.SELF_LINK = new TextField('selfLink');
    K.Video.CAST = new TextField('cast');
    K.Video.DIRECTORS = new TextField('directors');
    K.Video.WRITERS = new TextField('writers');
    K.Video.BPM = new NumericField('statistics.bpm');
    K.Video.POPULARITY = new NumericField('statistics.popularity');
    K.Video.MORE_LINK = new TextField('moreLink');
    
    K.utils.addFactory(K.Video);
    
    K.Video.prototype = Object.create(EntityBase.prototype);
    K.Video.prototype._baseURL = 'videos.json?';
    K.Video.prototype._URLprefix = 'data/';

    return K;

}));