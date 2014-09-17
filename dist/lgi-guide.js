// LGI TV Guide JS SDK
// ----------------------------------
// v0.4.3
//
// Copyright (c) 2014 Liberty Global
// Distributed under BSD license

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.LGI = {};
        root.LGI.Guide = factory();
    }
}(this, function () {

    //Defining global namespace
    var LGI = {};
    LGI.Guide = {};
    
    /**
     * @namespace utils
     * @module utils
     */
    
    LGI.Guide.utils = {
        addFactory: function (objectToProceed) {
            objectToProceed.create = function () {
                return new objectToProceed();
            }
        }
    };
    
    var xhrRequest = function () {
    
      function noop() {}
    
      function xhrRequest(url, successCallback, errorCallback) {
        var transport = new XMLHttpRequest();
    
        if (typeof successCallback !== 'function') {
          successCallback = noop;
        }
    
        if (typeof errorCallback !== 'function') {
          errorCallback = noop;
        }
    
        transport.open('GET', url);
        transport.setRequestHeader('app_id', 'dc573c37');
        transport.setRequestHeader('app_key', 'f4521ced0cb9af73374731a77b2f21f6');
    
        transport.onreadystatechange = function () {
          if (transport.readyState === 4 && transport.status === 200) {
            var reply = transport.responseText;
            var json;
    
            if (typeof reply === 'object' && !!reply) {
              json = reply;
            } else if (typeof reply === 'string' && !!reply) {
              try {
                json = JSON.parse(reply);
              } catch (error) {
                errorCallback(new Error('Invalid JSON response received'));
    
                return;
              }
            } else {
              errorCallback(new Error('Invalid JSON response received'));
    
              return;
            }
    
            successCallback(json);
          }
        };
    
        transport.onerror = function () {
          errorCallback(new Error('An error occurred while retrieving data (status ' + transport.status + ')'));
        };
    
        transport.ontimeout = function () {
          errorCallback(new Error('Request timed out'));
        };
    
        transport.send(null);
      }
    
      return xhrRequest;
    
    };
    
    var nodeRequest = function () {
        function nodeRequest(url, callback, errorCallback) {
            if (url.indexOf('http:') === -1) {
                url = 'http:' + url;
            }
    
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
     * @namespace LGI.Guide
     * @function LGI.Guide.requestTransport
     */
    
    var chooseTransport = function () {
        if (typeof module !== 'undefined' && module.exports) {
            return nodeRequest();
        } else {
            return xhrRequest();
        }
    };
    
    var requestTransport = chooseTransport();
    
    /**
     * Global variables
     * @namespace LGI.Guide.config
     */
    
    LGI.Guide.config = {
        /**
         * Represents URL of Kraken REST server.
         * @const LGI.Guide.config.APIURL
         */
        APIURL: 'http://api.lgi.io/kraken/v2/schedule/',
        /**
         * Represents URL of Kraken REST server.
         * @const LGI.Guide.config.region
         */
        region: ''
    };
    
    /**
     * Request is a class which is designed to be used as a property of entity to communicate with server and remember state of data transfer
     * @namespace LGI.Guide
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
            this.nextBatchLink = response.nextBatchLink.href;
        } else {
            this.nextBatchLink = undefined;
        }
    
        if (nextBatchSteps !== undefined) {
            nextBatchSteps--;
        }
    
        if ((nextBatchSteps > 0 || nextBatchSteps === undefined) && this.nextBatchLink !== undefined && !!this.nextBatchLink) {
            requestTransport(this.nextBatchLink, this.createScopedCallback(callback, nextBatchSteps, pipelineData));
        } else {
            if (callback !== undefined) {
                callback.bind(this)(pipelineData, response);
            }
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
     * @namespace LGI.Guide.fields
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
     * @namespace LGI.Guide.fields
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
     * @namespace LGI.Guide.fields
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
     * @namespace LGI.Guide.fields
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
     * @namespace LGI.Guide.fields
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
    
    /**
     * Represents base query-building logic
     * @namespace LGI.Guide
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
        this._addURLModification('limit=' + limitTo);
    
        return this;
    };
    
    /**
     * Determines list of fields to be retrieved from server. For example by "a.fields(LGI.Guide.channel.id, LGI.Guide.channel.name);"
     * @method EntityBase#fields
     * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
     */
    EntityBase.prototype.fields = function (multipleArgs) {
        this._addURLModification('fields=' + Array.prototype.slice.call(arguments).join(','));
    
        return this;
    };
    
    /**
     * Sets sorting field and order. For example "a.sort(LGI.Guide.broadcast.startTime);"
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
     * Filters data by some of entity properties. For example "a.filter(LGI.Guide.channel.id.equalTo(1));"
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
        this._requestURL = LGI.Guide.config.APIURL;
    
        if (this._URLprefix !== undefined) {
            this._requestURL += this._URLprefix;
        }
    
        if (LGI.Guide.config.region !== '') {
            this._requestURL += LGI.Guide.config.region + '/';
        }
    
        this._requestURL += this._baseURL;
    
        for (var i = 0; i < this._queryModificationActions.length; i++) {
            //If processing is an action object - execute actionFunction on current URL
            if (this._queryModificationActions[i].actionFunction) {
                this._requestURL = this._executeModificationAction(this._queryModificationActions[i]);
            } else {
                //If this is just a string - concat
                var joinSymbol = '&';
                if (i === 0) {
                    joinSymbol = '';
                }
                this._requestURL += joinSymbol + this._queryModificationActions[i];
            }
        }
    
        return this._requestURL;
    };
    
    EntityBase.prototype._executeModificationAction = function (actionObject) {
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
    
            if (callback !== undefined) {
                callback.bind(this)(data);
            }
        };
    
        return scopedCallback.bind(this);
    };
    
    /**
     * Class describes broadcast-specific fields and request logic
     * @namespace LGI.Guide.entities
     * @class Broadcast
     * @extends EntityBase
     */
    
    LGI.Guide.Broadcast = function () {
        EntityBase.call(this);
        if (LGI.Guide.config.region === undefined) {
            console.warn('Please, specify region before sending requests to Broadcasts endpoint.');
        }
    };
    
    LGI.Guide.Broadcast.ID = new RootChangingField('id', 'broadcasts');
    LGI.Guide.Broadcast.START = new NumericField('start');
    LGI.Guide.Broadcast.END = new NumericField('end');
    LGI.Guide.Broadcast.CRID = new TextField('video.crid');
    LGI.Guide.Broadcast.IMI = new TextField('imi');
    LGI.Guide.Broadcast.CHANNEL = new TextField('channel');
    LGI.Guide.Broadcast.CHANNEL_NAME = new TextField('channel.name');
    //LGI.Guide.Broadcast.CHANNEL_REF = new PrependField('channel.ref', 'channels');
    //LGI.Guide.Broadcast.STATISTICS = new TextField('video.statistics');
    LGI.Guide.Broadcast.VIDEO_ID = new TextField('video.id');
    LGI.Guide.Broadcast.TITLE = new TextField('video.title');
    LGI.Guide.Broadcast.SYNOPSIS = new TextField('video.synopsis');
    LGI.Guide.Broadcast.AGE_RATING = new TextField('video.ageRating');
    LGI.Guide.Broadcast.CATEGORY = new TextField('video.category');
    //LGI.Guide.Broadcast.OPENGRAPH_LINK = new TextField('video.opengraphLink');
    LGI.Guide.Broadcast.RECORD_LINK = new TextField('video.recordLink');
    //LGI.Guide.Broadcast.SELF_LINK = new TextField('selfLink');
    LGI.Guide.Broadcast.CAST = new TextField('video.cast');
    LGI.Guide.Broadcast.DIRECTORS = new TextField('video.directors');
    LGI.Guide.Broadcast.WRITERS = new TextField('video.writers');
    //LGI.Guide.Broadcast.EPISODE = new NumericField('episode');
    //LGI.Guide.Broadcast.SEASON = new NumericField('season');
    LGI.Guide.Broadcast.IMAGE_LINK = new NumericField('video.imageLink');
    LGI.Guide.Broadcast.BPM = new NumericField('statistics.bpm');
    LGI.Guide.Broadcast.POPULARITY = new NumericField('statistics.popularity');
    //LGI.Guide.Broadcast.MORE_LINK = new TextField('moreLink');
    
    LGI.Guide.utils.addFactory(LGI.Guide.Broadcast);
    
    LGI.Guide.Broadcast.prototype = Object.create(EntityBase.prototype);
    LGI.Guide.Broadcast.prototype._baseURL = 'broadcasts.json?';
    LGI.Guide.Broadcast.prototype._URLprefix = 'data/';
    /**
     * Class describes channel-specific fields and request logic
     * @namespace LGI.Guide.entities
     * @class Channel
     * @extends EntityBase
     */
    
    LGI.Guide.Channel = function () {
        EntityBase.call(this);
        if (LGI.Guide.config.region === undefined) {
            console.warn('Please, specify region before sending requests to Channel endpoint.');
        }
    };
    
    LGI.Guide.Channel.REF = new TextField('ref');
    LGI.Guide.Channel.NAME = new TextField('name');
    LGI.Guide.Channel.LOGICAL_POSITION = new NumericField('logicalPosition');
    LGI.Guide.Channel.LOGO_LINK = new TextField('logoLink');
    LGI.Guide.Channel.BROADCASTS_LINK = new TextField('broadcastsLink');
    LGI.Guide.Channel.OPENGRAPH_LINK = new TextField('opengraphLink');
    LGI.Guide.Channel.SELF_LINK = new TextField('selfLink');
    LGI.Guide.Channel.GENRES = new TextField('genres');
    LGI.Guide.Channel.BROADCASTS = new TextField('broadcasts');
    
    LGI.Guide.utils.addFactory(LGI.Guide.Channel);
    
    LGI.Guide.Channel.prototype = Object.create(EntityBase.prototype);
    LGI.Guide.Channel.prototype._baseURL = 'channels.json?';
    LGI.Guide.Channel.prototype._URLprefix = 'data/';
    /**
     * Encapsulates Region-specific fields and request logic
     * @namespace LGI.Guide.entities
     * @class Region
     * @extends EntityBase
     */
    LGI.Guide.Region = function () {
        EntityBase.call(this);
    };
    
    LGI.Guide.Region.ID = new TextField('id');
    LGI.Guide.Region.NAME = new TextField('name');
    LGI.Guide.Region.SUBREGIONS = new TextField('subregions');
    LGI.Guide.Region.GENRES = new TextField('genres');
    LGI.Guide.Region.CATEGORIES = new TextField('categories');
    LGI.Guide.Region.CHANNEL_LINEUP_LINK = new TextField('channelLineupLink');
    LGI.Guide.Region.SELF_LINK = new TextField('selfLink');
    LGI.Guide.Region.TOP_BROADCASTS_LINK = new TextField('topBroadcastsLink');
    LGI.Guide.Region.TOP_VIDEOS_LINK = new TextField('topVideosLink');
    
    LGI.Guide.utils.addFactory(LGI.Guide.Region);
    
    LGI.Guide.Region.prototype = Object.create(EntityBase.prototype);
    LGI.Guide.Region.prototype._baseURL = 'regions.json?';
    /**
     * Class describes video-specific fields and request logic
     * @namespace LGI.Guide.entities
     * @class Video
     * @extends EntityBase
     */
    
    LGI.Guide.Video = function () {
        EntityBase.call(this);
        if (LGI.Guide.config.region === undefined) {
            console.warn('Please, specify region before sending requests to Video endpoint.');
        }
    };
    
    LGI.Guide.Video.ID = new RootChangingField('id', 'videos');
    LGI.Guide.Video.TITLE = new TextField('title');
    LGI.Guide.Video.SYNOPSIS = new TextField('synopsis');
    LGI.Guide.Video.CATEGORY = new TextField('category');
    LGI.Guide.Video.SEASON = new NumericField('season');
    LGI.Guide.Video.EPISODE = new NumericField('episode');
    LGI.Guide.Video.CRID = new TextField('crid');
    LGI.Guide.Video.STATISTICS = new TextField('statistics');
    LGI.Guide.Video.AGE_RATING = new TextField('ageRating');
    LGI.Guide.Video.IMAGE_LINK = new TextField('imageLink');
    LGI.Guide.Video.OPENGRAPH_LINK = new TextField('opengraphLink');
    LGI.Guide.Video.SELF_LINK = new TextField('selfLink');
    LGI.Guide.Video.CAST = new TextField('cast');
    LGI.Guide.Video.DIRECTORS = new TextField('directors');
    LGI.Guide.Video.WRITERS = new TextField('writers');
    LGI.Guide.Video.BPM = new NumericField('statistics.bpm');
    LGI.Guide.Video.POPULARITY = new NumericField('statistics.popularity');
    LGI.Guide.Video.MORE_LINK = new TextField('moreLink');
    
    LGI.Guide.utils.addFactory(LGI.Guide.Video);
    
    LGI.Guide.Video.prototype = Object.create(EntityBase.prototype);
    LGI.Guide.Video.prototype._baseURL = 'videos.json?';
    LGI.Guide.Video.prototype._URLprefix = 'data/';

    return LGI.Guide;

}));