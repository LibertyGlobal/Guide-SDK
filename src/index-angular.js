/* globals angular, Guide */

angular.module('lgi.guide', ['$http'])
    .factory('Guide', ['$http', function ($http) {
      'use strict';

      //= index

      Guide.request = function (url, headers, onSuccess, onError) {
        var settings = {
          method: 'GET',
          url: url,
          headers: headers
        };

        $http(settings)
            .success(onSuccess)
            .error(onError);
      };

      return Guide;
    }]);
