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
