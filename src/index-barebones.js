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

  //= index.js

  Guide.request = function (/* url, headers, onSuccess, onError */) {
    throw new Error('LGI.Guide.request is not defined');
  };

  return Guide;
}));
