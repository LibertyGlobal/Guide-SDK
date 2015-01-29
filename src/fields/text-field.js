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
