/* globals define, module, Guide */

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define([], function () {
      root.LGI = root.LGI || {};
      root.LGI.Guide = factory();

      return root.LGI.Guide;
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.LGI = root.LGI || {};
    root.LGI.Guide = factory();
  }
}(this, function () {
  'use strict';

  if (typeof XMLHttpRequest === 'undefined') {
    throw new Error('XMLHttpRequest is required, but not supported in this environment');
  }

  if (typeof JSON === 'undefined' || typeof JSON.parse !== 'function') {
    throw new Error('JSON.parse() is required, but not supported in this environment');
  }

  //= index.js

  Guide.request = function (url, headers, onSuccess, onError) {
    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    Object.keys(headers).forEach(function (key) {
      request.setRequestHeader(key, headers[key]);
    });

    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }

      switch (request.status) {
        case 0:
          onError({
            message: 'Cross-domain request not permitted',
            error: null
          });
          break;

        case 200:
          var result;

          try {
            result = JSON.parse(request.responseText);
          } catch (error) {
            onError({
              message: 'Error while parsing response JSON',
              error: error
            });

            return;
          }

          onSuccess(result);
          break;

        default:
          onError({
            message: 'Unexpected server response',
            error: {
              status: request.status,
              statusText: request.statusText
            }
          });
      }
    };

    request.send();
  };

  return Guide;
}));
