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
