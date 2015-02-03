/**
 * Liberty Global TV Guide SDK (jQuery version) - A utility library for the Liberty Global Schedule APIs
 * @version v0.5.2
 * @link 
 * @license MIT
 */
/* globals define, module, Guide */

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function (jQuery) {
      root.LGI = root.LGI || {};
      root.LGI.Guide = factory(jQuery);

      return root.LGI.Guide;
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.LGI = root.LGI || {};
    root.LGI.Guide = factory(root.jQuery);
  }
}(this, function (jQuery) {
  'use strict';

  /**
   * @namespace LGI
   */
  
  // jshint unused:false
  
  /**
   * Takes a list of predicates and returns a new function
   * that iteratively applies each of the predicates to the
   * provided arguments.
   * Short circuits on first negative result.
   *
   * @ignore
   * @protected
   * @param {...(Function|Array.<Function>)} predicates A list of predicates
   * @returns {Function} Combined function
   */
  var and = function (predicates) {
    'use strict';
  
    predicates = Array.prototype.slice.call(arguments);
  
    return function () {
      var values = arguments;
  
      return predicates.every(function (predicate) {
        return predicate.apply(null, values);
      });
    };
  };
  
  /**
   * Takes a list of predicates and returns a new function
   * that iteratively applies each of the predicates to the
   * provided arguments.
   * Short circuits on first positive result.
   *
   * @ignore
   * @protected
   * @param {...(Function|Array.<Function>)} predicates A list of predicates
   * @returns {Function} Combined function
   */
  var or = function (predicates) {
    'use strict';
  
    predicates = Array.prototype.slice.call(arguments);
  
    return function () {
      var values = arguments;
  
      return predicates.some(function (predicate) {
        return predicate.apply(null, values);
      });
    };
  };
  
  /**
   * Takes a function that returns a boolean value and returns
   * a new function that negates the return value of the original
   * function.
   *
   * @ignore
   * @protected
   * @param {Function} fn The function to negate
   * @returns {Function} The function that inverts boolean return values
   */
  var not = function (fn) {
    'use strict';
  
    return function () {
      return fn.apply(null, arguments) === false;
    };
  };
  
  /**
   * Checks if the value exists (is not undefined and not null).
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value exists
   */
  var exists = function (value) {
    'use strict';
  
    return typeof value !== 'undefined' && value !== null;
  };
  
  /**
   * Checks if the supplied value has a positive length.
   *
   * @ignore
   * @protected
   * @param {string|Function|Array|Object} value The value to check
   * @returns {boolean} True if the value has a positive length
   */
  var hasLength = function (value) {
    'use strict';
  
    return value.length > 0;
  };
  
  /**
   * Checks if the value is numeric. Does not check for NaN.
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is numeric
   */
  var isNumeric = function (value) {
    'use strict';
  
    return typeof value === 'number';
  };
  
  /**
   * Checks if the value is a valid number.
   *
   * @ignore
   * @type {Function}
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the the value is a valid number
   */
  var isNumber =  and(isNumeric, not(isNaN), isFinite);
  
  /**
   * Checks if the value is zero or positive. Does not check if it is a number.
   *
   * @ignore
   * @protected
   * @param {number} value The value to check
   * @returns {boolean} True if the value is zero or positive
   */
  var isPositive = function (value) {
    'use strict';
  
    return value >= 0;
  };
  
  /**
   * Checks if the value is zero or a valid positive number.
   *
   * @ignore
   * @type {Function}
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is zero or a valid positive number
   */
  var isPositiveNumber = and(isNumber, isPositive);
  
  /**
   * Checks if the value is a string. Does not check for empty strings.
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is a string
   */
  var isString = function (value) {
    'use strict';
  
    return typeof value === 'string';
  };
  
  /**
   * Checks if the value is a non-empty string.
   *
   * @ignore
   * @type {Function}
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is a non-empty string
   */
  var isNonEmptyString = and(isString, hasLength);
  
  /**
   * Checks if the value is a function.
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is a function
   */
  var isFunction = function (value) {
    'use strict';
  
    return typeof value === 'function';
  };
  
  
  /**
   * Checks if the value is an object.
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is an object
   */
  var isObject = function (value) {
    'use strict';
  
    return Object(value) === value;
  };
  
  /**
   * Checks if the value is an array.
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is an array
   */
  var isArray = function (value) {
    'use strict';
  
    return Object.prototype.toString.call(value) === '[object Array]';
  };
  
  /**
   * Checks if the value is an arguments object.
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @returns {boolean} True if the value is an arguments object
   */
  var isArguments = function (value) {
    'use strict';
  
    return Object.prototype.toString.call(value) === '[object Arguments]';
  };
  
  /**
   * Checks if the value is an instance of a type.
   *
   * @ignore
   * @protected
   * @param {*} value The value to check
   * @param {Function} type The target type
   * @returns {boolean} True if the value is an instance of the type
   */
  var isInstanceOf = function (value, type) {
    'use strict';
  
    return value instanceof type;
  };
  
  /**
   * Converts array-like objects to native arrays.
   *
   * @ignore
   * @protected
   * @param {*} value The value to convert
   * @returns {Array} Value converted to array
   */
  var toArray = function (value) {
    'use strict';
  
    return Array.prototype.slice.call(value, 0);
  };
  
  /**
   * Utility function to normalize variadic arguments passed
   * to a function. Useful for functions that should accept
   * multiple values as arguments, or an array of values.
   *
   * @ignore
   * @protected
   * @param {*} value Array-like object
   * @returns {Array} Values as an array
   */
  var normalizeVariadic = function (value) {
    'use strict';
  
    // If we're dealing with non-array-like object, exit early
    if (!isArray(value) && !isArguments(value)) {
      return [];
    }
  
    switch (value.length) {
      // An empty list
      case 0:
        return [];
  
      // Single value. If it's an array return it, otherwise
      // wrap the value into an array
      case 1:
        return isArray(value[0]) ? value[0] : [value[0]];
  
      // More than one entry. Convert the array-like object into an array
      default:
        return toArray(value);
    }
  };
  /* globals exists, isInstanceOf, isFunction */
  
  /**
   * Provides the interface for "evaluating" a value against a context.
   *
   * @ignore
   * @constructor
   * @param {*} value The value
   * @param {object} [context] The original context associated with the value
   * @param {string} [separator] The string to use as a separator when evaluating
   */
  function Evaluable(value, context, separator) {
    'use strict';
  
    /** @private */
    this.value = value;
  
    /** @private */
    this.context = context;
  
    /** @private */
    this.separator = separator || '';
  }
  
  /**
   * Boxes any value into an Evaluable.
   * If the value is already an instance of Evaluable, it returns it directly.
   *
   * @static
   * @param {*} value The value to cast
   * @returns {Evaluable} The boxed value
   */
  Evaluable.from = function (value) {
    'use strict';
  
    if (isInstanceOf(value, Evaluable)) {
      return value;
    }
  
    return new Evaluable(value);
  };
  
  /**
   * Evaluates the value against the given context.
   * If the context is the same as the original context associated with
   * the value, returns just the value; otherwise returns the concatenated
   * result of the evaluated context and the value.
   *
   * @private
   * @param {object} context The context to evaluate against
   * @returns {*} The evaluated value
   */
  Evaluable.prototype.evaluate = function (context) {
    'use strict';
  
    if (exists(this.context) && isFunction(this.context.evaluate)) {
      if (this.context === context) {
        return this.value;
      }
  
      return [this.context.evaluate(context), this.value].join(this.separator);
    }
  
    return this.value;
  };
  
  /**
   * Returns the item serialized into a string.
   *
   * @returns {string} Serialized item
   */
  Evaluable.prototype.toString = function () {
    'use strict';
  
    return this.evaluate(null);
  };
  /* globals Evaluable */
  
  /**
   * Encapsulates an evaluable expression of an operation on a field.
   *
   * @ignore
   * @extends Evaluable
   * @protected
   * @constructor
   * @param {Field} field Instance of field the operation applies to
   * @param {string} operation The operation
   * @param {*} value The operand
   */
  function Expression(field, operation, value) {
    'use strict';
  
    Evaluable.call(this, value, field, operation);
  }
  
  Expression.prototype = Object.create(Evaluable.prototype);
  /* globals exists, isString, isNonEmptyString, isPositiveNumber, isFunction, normalizeVariadic, Evaluable, Expression */
  // jshint unused:false
  
  /**
   * Provides a fluent interface for building request queries and
   * executing the request.
   *
   * @alias LGI.Guide~RequestBuilder
   * @protected
   * @constructor
   * @param {object} resource The resource to request
   * @param {string} region The code of the target region
   * @param {string} baseURL The base URL of the API
   * @param {string} appId The app id (required for authentication)
   * @param {string} appKey The app key (required for authentication)
   * @param {function} request The request function
   * @param {string[]|number[]} [ids] A list of resource ids
   * @throws {TypeError} Invalid region provided
   * @throws {TypeError} Invalid baseURL provided
   * @throws {TypeError} Invalid appId provided
   * @throws {TypeError} Invalid appKey provided
   * @throws {TypeError} Invalid request provided
   */
  function RequestBuilder(resource, region, baseURL, appId, appKey, request, ids) {
    'use strict';
  
    if (!isNonEmptyString(region)) {
      throw new TypeError('Invalid region');
    }
  
    if (!isNonEmptyString(baseURL)) {
      throw new TypeError('Invalid baseURL');
    }
  
    if (!isNonEmptyString(appId)) {
      throw new TypeError('Invalid appId');
    }
  
    if (!isNonEmptyString(appKey)) {
      throw new TypeError('Invalid appKey');
    }
  
    if (!isFunction(request)) {
      throw new TypeError('Invalid request function');
    }
  
    var fields = [];
    var filters = [];
    var sorting = Evaluable.from(null);
    var skip = 0;
    var limit = 0;
  
    /**
     * Adds the provided fields to the list of fields to fetch.
     * Returns itself for chaining.
     *
     * @param {...(Field|string)} values List of fields
     * @returns {LGI.Guide~RequestBuilder} Itself
     */
    this.fields = function (values) {
      values = normalizeVariadic(arguments).map(Evaluable.from);
      fields = fields.concat(values);
  
      return this;
    };
  
    /**
     * Adds the provided filter expressions to the list of filters to apply
     * when fetching the resources.
     * Returns itself for chaining.
     *
     * @param {...(Field|string)} values List of filters
     * @returns {LGI.Guide~RequestBuilder} Itself
     */
    this.filter = function (values) {
      values = normalizeVariadic(arguments).map(Evaluable.from);
      filters = filters.concat(values);
  
      return this;
    };
  
    /**
     * Sets the sort field and order.
     * Returns itself for chaining.
     *
     * @param {Field|string} field The field by which to sort
     * @param {string} [order] The sorting order - asc or desc
     * @returns {LGI.Guide~RequestBuilder} Itself
     */
    this.sortBy = function (field, order) {
      field = Evaluable.from(field);
      order = isString(order) && order.toLowerCase() === 'desc' ? 'desc' : 'asc';
  
      sorting = new Expression(field, '', '(' + order + ')');
  
      return this;
    };
  
    /**
     * Sets the offset of the results.
     * Returns itself for chaining.
     *
     * @param {number} value The offset amount
     * @returns {LGI.Guide~RequestBuilder} Itself
     */
    this.skip = function (value) {
      if (isPositiveNumber(value)) {
        skip = value;
      }
  
      return this;
    };
  
    /**
     * Sets the maximum number of results.
     * Returns itself for chaining.
     *
     * @param {number} value The maximum number of results
     * @returns {LGI.Guide~RequestBuilder} Itself
     */
    this.limit = function (value) {
      if (isPositiveNumber(value)) {
        limit = value;
      }
  
      return this;
    };
  
    /**
     * Sends the request immediately.
     *
     * @param {function} [onSuccess] The success callback
     * @param {function} [onError] The error callback
     * @throws {TypeError} Invalid onSuccess callback
     * @throws {TypeError} Invalid onError callback
     */
    this.execute = function (onSuccess, onError) {
      if (exists(onSuccess)) {
        if (!isFunction(onSuccess)) {
          throw new TypeError('Invalid onSuccess callback');
        }
      } else {
        onSuccess = function () {};
      }
  
      if (exists(onError)) {
        if (!isFunction(onError)) {
          throw new TypeError('Invalid onError callback');
        }
      } else {
        onError = function () {};
      }
  
      var url = this.toString();
      var headers = {
        'X-Auth-Id': appId,
        'X-Auth-Key': appKey
      };
  
      request(url, headers, onSuccess, onError);
    };
  
    /**
     * Builds the URL for the request based on provided parameters.
     *
     * @returns {string} The URL for the request
     */
    this.toString = function () {
      var url = baseURL + '/' + region + '/' + resource.endpoint;
      var query = [];
  
      if (ids && ids.length) {
        url += '/' + ids.join(',');
      }
  
      // evaluate all the fields
      var evaluatedFields = fields.map(function (field) {
        return field.evaluate(resource);
      });
  
      if (evaluatedFields.length) {
        query.push('fields=' + evaluatedFields.join(','));
      }
  
      // evaluate all the filters
      var evaluatedFilters = filters.map(function (filter) {
        return filter.evaluate(resource);
      });
  
      if (evaluatedFilters.length) {
        query = query.concat(evaluatedFilters);
      }
  
      var evaluatedSort = sorting.evaluate(resource);
  
      if (evaluatedSort) {
        query.push('sort=' + evaluatedSort);
      }
  
      if (skip) {
        query.push('skip=' + skip);
      }
  
      if (limit) {
        query.push('limit=' + limit);
      }
  
      return url + '.json?' + query.join('&');
    };
  }
  /**
   * Represents a resource (Broadcast, Video, Channel)
   * with a name and an optional endpoint
   *
   * @ignore
   * @protected
   * @param {string} name The name of the resource
   * @param {string} endpoint The endpoint for the resource
   * @constructor
   */
  function Resource(name, endpoint) {
    'use strict';
  
    this.name = name;
    this.endpoint = endpoint;
  }
  
  /**
   * Returns the name of the resource
   *
   * @returns {string}
   */
  Resource.prototype.evaluate = function () {
    'use strict';
  
    return this.name;
  };
  /* globals Evaluable */
  
  /**
   * Represents a field (property) of a resource.
   *
   * @alias LGI.Guide~Field
   * @extends Evaluable
   * @protected
   * @constructor
   * @param {object} context The owner context
   * @param {string} name The name of the field
   */
  function Field(context, name) {
    'use strict';
  
    Evaluable.call(this, name, context, '.');
  }
  
  Field.prototype = Object.create(Evaluable.prototype);
  /* globals Field, Expression */
  
  /**
   * Represents a numeric field
   *
   * @alias LGI.Guide~NumericField
   * @extends LGI.Guide~Field
   * @protected
   * @param {object} context The owner context
   * @param {string} name The name of the field
   * @constructor
   */
  function NumericField(context, name) {
    'use strict';
  
    Field.call(this, context, name);
  }
  
  NumericField.prototype = Object.create(Field.prototype);
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field<value` when evaluated.
   *
   * @param {number} value The value to compare to
   * @returns {Expression} Expression of the comparison
   */
  NumericField.prototype.isLessThan = function (value) {
    'use strict';
  
    return new Expression(this, '<', value);
  };
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field<=value` when evaluated.
   *
   * @param {number} value The value to compare to
   * @returns {Expression} Expression of the comparison
   */
  NumericField.prototype.isLessThanOrEqualTo = function (value) {
    'use strict';
  
    return new Expression(this, '<=', value);
  };
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field=value` when evaluated.
   *
   * @param {number} value The value to compare to
   * @returns {Expression} Expression of the comparison
   */
  NumericField.prototype.isEqualTo = function (value) {
    'use strict';
  
    return new Expression(this, '=', value);
  };
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field>=value` when evaluated.
   *
   * @param {number} value The value to compare to
   * @returns {Expression} Expression of the comparison
   */
  NumericField.prototype.isGreaterThanOrEqualTo = function (value) {
    'use strict';
  
    return new Expression(this, '>=', value);
  };
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field>value` when evaluated.
   *
   * @param {number} value The value to compare to
   * @returns {Expression} Expression of the comparison
   */
  NumericField.prototype.isGreaterThan = function (value) {
    'use strict';
  
    return new Expression(this, '>', value);
  };
  /* globals Field, Expression */
  
  /**
   * Represents a text field
   *
   * @alias LGI.Guide~TextField
   * @extends LGI.Guide~Field
   * @protected
   * @param {object} context The owner context
   * @param {string} name The name of the field
   * @constructor
   */
  function TextField(context, name) {
    'use strict';
  
    Field.call(this, context, name);
  }
  
  TextField.prototype = Object.create(Field.prototype);
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field=value` when evaluated.
   *
   * @param {string} value The value to compare to
   * @returns {Expression} Expression of the comparison
   */
  TextField.prototype.isEqualTo = function (value) {
    'use strict';
  
    return new Expression(this, '=', value);
  };
  /* globals TextField, Expression */
  
  /**
   * Represents a fuzzy-match field
   *
   * @alias LGI.Guide~FuzzyMatchField
   * @extends LGI.Guide~TextField
   * @protected
   * @constructor
   * @param {object} context The owner context
   * @param {string} name The name of the field
   */
  function FuzzyMatchField(context, name) {
    'use strict';
  
    TextField.call(this, context, name);
  }
  
  FuzzyMatchField.prototype = Object.create(TextField.prototype);
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field~value` when evaluated.
   *
   * @param {string} value The value to compare to
   * @returns {Expression} Expression of the comparison
   */
  FuzzyMatchField.prototype.matches = function (value) {
    'use strict';
  
    return new Expression(this, '~', value);
  };
  /* globals normalizeVariadic, TextField, Expression */
  
  /**
   * Represents a multi-value field
   *
   * @alias LGI.Guide~MultiValueField
   * @extends LGI.Guide~TextField
   * @protected
   * @constructor
   * @param {object} context The owner context
   * @param {string} name The name of the field
   */
  function MultiValueField(context, name) {
    'use strict';
  
    TextField.call(this, context, name);
  }
  
  MultiValueField.prototype = Object.create(TextField.prototype);
  
  /**
   * Creates and returns an expression that produces the
   * comparison `field=val1,val2,...,valN` when evaluated.
   *
   * @param {...string} values The values to compare to
   * @returns {Expression} Expression of the comparison
   */
  MultiValueField.prototype.isIn = function (values) {
    'use strict';
  
    values = arguments;
  
    return new Expression(this, '=', normalizeVariadic(values).join(','));
  };
  /* globals Resource, Field, NumericField */
  
  /**
   * Represents a broadcast resource and its fields
   *
   * @memberOf LGI.Guide
   * @type {Resource}
   * @property {LGI.Guide~Field} IMI
   * @property {LGI.Guide~NumericField} START
   * @property {LGI.Guide~NumericField} END
   * @property {LGI.Guide~Field} CHANNEL
   * @property {LGI.Guide~Field} VIDEO
   * @property {LGI.Guide~NumericField} BUZZ_PER_MINUTE
   * @property {LGI.Guide~NumericField} POPULARITY
   */
  var Broadcast = new Resource('broadcast', 'broadcasts');
  
  Broadcast.IMI = new Field(Broadcast, 'imi');
  Broadcast.START = new NumericField(Broadcast, 'start');
  Broadcast.END = new NumericField(Broadcast, 'end');
  Broadcast.CHANNEL = new Field(Broadcast, 'channel');
  Broadcast.VIDEO = new Field(Broadcast, 'video');
  Broadcast.BUZZ_PER_MINUTE = new NumericField(Broadcast, 'statistics.bpm');
  Broadcast.POPULARITY = new NumericField(Broadcast, 'statistics.popularity');
  /* globals Resource, Field, NumericField, FuzzyMatchField, MultiValueField */
  
  /**
   * Represents a channel resource and its fields
   *
   * @memberOf LGI.Guide
   * @type {Resource}
   * @property {LGI.Guide~MultiValueField} REF
   * @property {LGI.Guide~FuzzyMatchField} NAME
   * @property {LGI.Guide~NumericField} POSITION
   * @property {LGI.Guide~Field} LOGO_LINK
   * @property {LGI.Guide~Field} OPENGRAPH_LINK
   */
  var Channel = new Resource('channel', 'channels');
  
  Channel.REF = new MultiValueField(Channel, 'ref');
  Channel.NAME = new FuzzyMatchField(Channel, 'name');
  Channel.POSITION = new NumericField(Channel, 'logicalPosition');
  Channel.LOGO_LINK = new Field(Channel, 'logoLink');
  Channel.OPENGRAPH_LINK = new Field('opengraphLink');
  /* globals Resource, Field, NumericField, TextField, FuzzyMatchField */
  
  /**
   * Represents a video resource and its fields
   *
   * @memberOf LGI.Guide
   * @type {Resource}
   * @property {LGI.Guide~Field} CRID
   * @property {LGI.Guide~FuzzyMatchField} TITLE
   * @property {LGI.Guide~Field} SHORT_SYNOPSIS
   * @property {LGI.Guide~Field} SYNOPSIS
   * @property {LGI.Guide~FuzzyMatchField} CATEGORY
   * @property {LGI.Guide~NumericField} SEASON
   * @property {LGI.Guide~NumericField} EPISODE
   * @property {LGI.Guide~Field} STATISTICS
   * @property {LGI.Guide~TextField} AGE_RATING
   * @property {LGI.Guide~Field} CAST
   * @property {LGI.Guide~Field} DIRECTORS
   * @property {LGI.Guide~Field} WRITERS
   * @property {LGI.Guide~Field} IMAGE_LINK
   * @property {LGI.Guide~Field} OPENGRAPH_LINK
   * @property {LGI.Guide~Field} RECORD_LINK
   */
  var Video = new Resource('video', 'videos');
  
  Video.CRID = new Field(Video, 'crid');
  Video.TITLE = new FuzzyMatchField(Video, 'title');
  Video.SHORT_SYNOPSIS = new Field(Video, 'shortSynopsis');
  Video.SYNOPSIS = new Field(Video, 'synopsis');
  Video.CATEGORY = new FuzzyMatchField(Video, 'category');
  Video.SEASON = new NumericField(Video, 'season');
  Video.EPISODE = new NumericField(Video, 'episode');
  Video.STATISTICS = new Field(Video, 'statistics');
  Video.AGE_RATING = new TextField(Video, 'ageRating');
  Video.CAST = new Field(Video, 'cast');
  Video.DIRECTORS = new Field(Video, 'directors');
  Video.WRITERS = new Field(Video, 'writers');
  Video.IMAGE_LINK = new Field(Video, 'imageLink');
  Video.OPENGRAPH_LINK = new Field(Video, 'opengraphLink');
  Video.RECORD_LINK = new Field(Video, 'recordLink');
  /* globals isObject, isNonEmptyString, normalizeVariadic, RequestBuilder, Broadcast, Video, Channel */
  
  /**
   * @namespace
   * @memberOf LGI
   */
  var Guide = {
    settings: {
      baseURL: 'http://test.appdev.io/kraken/v2/schedule/data',
      region: '',
      appId: '',
      appKey: ''
    },
  
    /**
     * Initializes the Guide for the given region.
     *
     * @param {object} settings The settings object
     * @param {string} settings.region Target region code
     * @param {string} settings.appId App id (used for authentication)
     * @param {string} settings.appKey App key (used for authentication)
     * @throws {TypeError} Invalid configuration object
     * @throws {TypeError} Invalid region code
     * @throws {TypeError} Invalid app id
     * @throws {TypeError} Invalid app key
     */
    initialize: function (settings) {
      'use strict';
  
      if (!isObject(settings)) {
        throw new TypeError('Invalid configuration object');
      }
  
      if (!isNonEmptyString(settings.region)) {
        throw new TypeError('Invalid region code');
      }
  
      if (!isNonEmptyString(settings.appId)) {
        throw new TypeError('Invalid app id');
      }
  
      if (!isNonEmptyString(settings.appKey)) {
        throw new TypeError('Invalid app key');
      }
  
      this.settings.region = settings.region;
      this.settings.appId = settings.appId;
      this.settings.appKey = settings.appKey;
    },
  
    /**
     * Takes zero or more ids of broadcasts and returns a
     * pre-configured instance of RequestBuilder for Broadcast resources.
     *
     * @param {...string} ids Zero or more broadcast ids
     * @returns {LGI.Guide~RequestBuilder} Instance of RequestBuilder for Broadcast resources
     */
    findBroadcasts: function (ids) {
      'use strict';
  
      ids = normalizeVariadic(arguments);
  
      return new RequestBuilder(Broadcast, this.settings.region, this.settings.baseURL,
          this.settings.appId, this.settings.appKey, Guide.request, ids);
    },
  
    /**
     * Takes zero or more ids of videos and returns a
     * pre-configured instance of RequestBuilder for Video resources.
     *
     * @param {...string} ids Zero or more video ids
     * @returns {LGI.Guide~RequestBuilder} Instance of RequestBuilder for Video resources
     */
    findVideos: function (ids) {
      'use strict';
  
      ids = normalizeVariadic(arguments);
  
      return new RequestBuilder(Video, this.settings.region, this.settings.baseURL,
          this.settings.appId, this.settings.appKey, Guide.request, ids);
    },
  
    /**
     * Takes zero or more ids (refs) of channels and returns a
     * pre-configured instance of RequestBuilder for Channel resources.
     *
     * @param {...string} ids Zero or more channel ids (refs)
     * @returns {LGI.Guide~RequestBuilder} Instance of RequestBuilder for Channel resources
     */
    findChannels: function (ids) {
      'use strict';
  
      ids = normalizeVariadic(arguments);
  
      return new RequestBuilder(Channel, this.settings.region, this.settings.baseURL,
          this.settings.appId, this.settings.appKey, Guide.request, ids);
    }
  };
  
  Guide.Broadcast = Broadcast;
  Guide.Video = Video;
  Guide.Channel = Channel;

  Guide.request = function (url, headers, onSuccess, onError) {
    jQuery.ajax({
      type: 'GET',
      url: url,
      headers: headers,
      dataType: 'json'
    }).then(onSuccess, onError);
  };

  return Guide;
}));