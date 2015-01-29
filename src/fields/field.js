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
