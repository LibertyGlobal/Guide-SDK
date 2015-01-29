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
