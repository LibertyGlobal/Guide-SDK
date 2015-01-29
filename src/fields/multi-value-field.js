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
