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
