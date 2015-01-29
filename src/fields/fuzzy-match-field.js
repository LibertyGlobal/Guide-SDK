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
