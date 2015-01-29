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
