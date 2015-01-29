/* globals define, module, Guide */

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function (jQuery) {
      root.LGI = root.LGI || {};
      root.LGI.Guide = factory(jQuery);

      return root.LGI.Guide;
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.LGI = root.LGI || {};
    root.LGI.Guide = factory(root.jQuery);
  }
}(this, function (jQuery) {
  'use strict';

  //= index

  Guide.request = function (url, headers, onSuccess, onError) {
    jQuery.ajax({
      type: 'GET',
      url: url,
      headers: headers,
      dataType: 'json'
    }).then(onSuccess, onError);
  };

  return Guide;
}));
