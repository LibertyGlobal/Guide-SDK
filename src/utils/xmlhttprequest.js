var xhrRequest = function () {

  function noop() {}

  function xhrRequest(url, successCallback, errorCallback) {
    var transport = new XMLHttpRequest();

    if (typeof successCallback !== 'function') {
      successCallback = noop;
    }

    if (typeof errorCallback !== 'function') {
      errorCallback = noop;
    }

    transport.open('GET', url, true);
    transport.setRequestHeader('X-Auth-Id', LGI.Guide.config.authId);
    transport.setRequestHeader('X-Auth-Key', LGI.Guide.config.authKey);

    transport.onreadystatechange = function () {
      if (transport.readyState === 4) {
        if (transport.status === 200) {
          try {
            var json = JSON.parse(transport.responseText);

            successCallback(json);
          } catch (error) {
            errorCallback(new Error([
              'Invalid JSON response',
              '(' + error.message + ')'
            ].join(' ')));
          }
        } else {
          errorCallback(new Error([
            'Unexpected server response',
            '(status=' + transport.status + ',',
            'statusText=' + transport.statusText + ')'
          ].join(' ')));
        }
      }
    };

    try {
      transport.send(null);
    } catch (error) {
      errorCallback(error.description);
    }
  }

  return xhrRequest;

};
