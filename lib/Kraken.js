/**
 * Initialization of namespace
 * @namespace kraken
 */


//Creating window.kraken namespace if we are not in Node JS module
if (typeof exports === 'undefined') {
    this.kraken = {};
};/**
 * Global variables
 * @namespace kraken
 * @module config
 */

(function (exports) {
    exports.config = {
        /**
         * Represents URL of Kraken REST server.
         * @const kraken.APIURL
         */
        APIURL: 'http://appdev.io/kraken/v2/schedule/',
        region: ''
    }
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * @namespace utils
 * @module utils
 */

(function (kraken) {
    kraken.utils = {
        addFactory: function (objectToProceed) {
            objectToProceed.create = function () {
                return new objectToProceed();
            }
        }
    }
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Module for ajax, JSONP
 * @namespace utils
 * @module jsonp
 */

(function (kraken) {
    kraken.jsonp = (function () {
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

        function jsonp(url, params, callback, callbackName) {
            var query = (url || '').indexOf('?') === -1 ? '?' : '&', key;

            callbackName = (callbackName || config.callbackName || 'callback');
            var uniqueName = callbackName + "_json" + (++counter);

            params = params || {};
            for (key in params) {
                if (params.hasOwnProperty(key)) {
                    query += encode(key) + "=" + encode(params[key]) + "&";
                }
            }

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

        function setDefaults(obj) {
            config = obj;
        }

        return jsonp;
    })();
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * @namespace utils
 * @module polyfills
 */

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

if (!Object.create) {
    Object.create = (function () {
        function F() {
        }

        return function (o) {
            if (arguments.length != 1) {
                throw new Error('Object.create implementation only accepts one parameter.');
            }
            F.prototype = o
            return new F()
        }
    })()
};/**
 * Abstract field with generic logic.
 * @namespace kraken.fields
 * @class AbstractField
 */

(function (kraken) {
    kraken.AbstractField = function (name) {
        this.name = name;
        this.operations = [];
    }

    var p = kraken.AbstractField.prototype;

    p.toString = function () {
        return this.name;
    }

    p.getStringForOperation = function (operator, operand) {
        return this.name + operator + operand;
    }
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Numeric field supports math comparing functions.
 * @namespace kraken.fields
 * @class NumericField
 * @extends AbstractField
 */

(function (kraken) {
    kraken.NumericField = function (name) {
        kraken.AbstractField.call(this, name);
    }

    var p = kraken.NumericField.prototype = Object.create(kraken.AbstractField.prototype);

    p.equalTo = function (operand) {
        return this.getStringForOperation('=', operand);
    }

    p.greaterThan = function (operand) {
        return this.getStringForOperation('>', operand);
    }

    p.lessThan = function (operand) {
        return this.getStringForOperation('<', operand);
    }

})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Textual field supports equal and regexp matching.
 * @namespace kraken.fields
 * @class TextField
 * @extends AbstractField
 */

(function (kraken) {
    kraken.TextField = function (name) {
        kraken.AbstractField.call(this, name);
    }

    var p = kraken.TextField.prototype = Object.create(kraken.AbstractField.prototype);

    p.equalTo = function (operand) {
        return this.getStringForOperation('=', operand);
    }

    p.isMatching = function (operand) {
        return this.getStringForOperation('~', operand);
    }

})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Request is a property of entity which communicates to server and remember state of transmittion
 * @namespace kraken
 * @class Request
 */

(function (kraken) {
    kraken.Request = function () {
        this.initialRequestURL = '';
        this.nextBatchLink = '';
    }

    var p = kraken.Request.prototype;

    p.execute = function (URL, callback, nextBatchSteps) {
        kraken.jsonp(URL, {}, callback);
    }

    p.proceedResponse = function (response) {
        /*TODO Save nextBatchAdress for next page processing
         Also add data to temporary object
         And request nextBatchAdress one more time if nextBatchSteps is greater than 0*/
    }
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
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
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Represents base query-building logic
 * @namespace kraken
 * @class EntityBase
 * @extends Collection
 */

(function (kraken) {
    kraken.EntityBase = function () {
        kraken.Collection.call(this);
        this._URLelements = [];
        this._requestURL = '';
        this._baseURL = '';
        this._request = new kraken.Request();
    }

    var p = kraken.EntityBase.prototype = Object.create(kraken.Collection.prototype);

    /**
     * Adds limitation to response data length. For example "a.limit(10);"
     * @method kraken.EntityBase#limit
     * @param {number} limitTo Number of maximum data elements in response.
     */
    p.limit = function (limitTo) {
        this._addURLElement('maxBatchSize=' + limitTo);
        return this;
    }

    /**
     * Determines list of fields to be retrieved from server. For example by "a.shows(kraken.channel.id, kraken.channel.name);"
     * @method kraken.EntityBase#fields
     * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
     */
    p.fields = function (multipleArgs) {
        this.addURLElement('show=');
        for (var i = 0; i < arguments.length; i++) {
            this._addURLElement(arguments[i]);
        }
        return this;
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

        this._addURLElement('sort=' + field + '(' + method + ')');
        return this;
    }

    /**
     * Filters data by some of entity properties. For example "a.filter(kraken.channel.id.equalTo(1));"
     * @method kraken.EntityBase#filter
     * @param {string} multipleArgs You can add unlimited number of strings as multiple parameters.
     */
    p.filter = function (multipleArgs) {
        for (var i = 0; i < arguments.length; i++) {
            this._addURLElement(arguments[i]);
        }
        return this;
    }

    p.one = function (callback) {
        this._buildURLFromElements();
        this._request.execute(this._requestURL, this._createScopedCallback(callback), 1);
        return this;
    }

    p.next = function (callback) {
        this._request.execute(this._request.nextBatchLink || this._buildURLFromElements(), this._createScopedCallback(callback), 1);
        return this;
    }

    p.all = function (callback) {
        this._buildURLFromElements();
        this._request.execute(this._requestURL, this._createScopedCallback(callback), 0);
        return this;
    }

    p._addURLElement = function (URLElement) {
        this._URLelements.push(URLElement);
    }

    p._buildURLFromElements = function () {
        this._requestURL = kraken.config.APIURL;

        if (kraken.config.region !== ''){
            this._requestURL += 'regions/' + kraken.config.region + '/';
        }

        this._requestURL += this._baseURL;

        for (var i = 0; i < this._URLelements.length; i++) {
            this._requestURL += this._URLelements[i];
            if (i < this._URLelements.length - 1) {
                this._requestURL += '&';
            }
        }

        return this._requestURL;
    }

    p._processData = function (data) {
        this.add(data.data);
    }

    p._createScopedCallback = function (callback) {
        var scopedCallback = function (data) {
            this._processData(data);
            callback.bind(this)(data);
        }

        return scopedCallback.bind(this);
    }

})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Class describes country-specific fields and request logic
 * @namespace kraken.entities
 * @class Country
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Country = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'regions.json';
    }

    kraken.utils.addFactory(kraken.Country);

    var p = kraken.Country.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Class describes city-specific fields and request logic
 * @namespace kraken.entities
 * @class City
 * @extends EntityBase
 */

(function (kraken) {
    kraken.City = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'regions.json';
    }

    kraken.utils.addFactory(kraken.City);

    var p = kraken.City.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Class describes channel-specific fields and request logic
 * @namespace kraken.entities
 * @class Channel
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Channel = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'channels.json?';
    }

    kraken.utils.addFactory(kraken.Channel);

    var p = kraken.Channel.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);;/**
 * Class describes broadcast-specific fields and request logic
 * @namespace kraken.entities
 * @class Broadcast
 * @extends EntityBase
 */

(function (kraken) {
    kraken.Broadcast = function () {
        kraken.EntityBase.call(this);
        this._baseURL = 'broadcasts.json?';
    }

    kraken.utils.addFactory(kraken.Broadcast);

    var p = kraken.Broadcast.prototype = Object.create(kraken.EntityBase.prototype);
})(typeof exports === 'undefined' ? this.kraken : exports);