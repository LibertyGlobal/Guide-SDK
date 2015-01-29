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
