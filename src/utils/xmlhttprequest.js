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

    transport.open('GET', url);
    transport.setRequestHeader('Authorization', '?');
    transport.responseType = 'json';

    transport.onload = function () {
      successCallback(transport.response);
    };

    transport.onerror = function () {
      errorCallback(new Error('An error occurred while retrieving data (status ' + transport.status + ')'));
    };

    transport.ontimeout = function () {
      errorCallback(new Error('Request timed out'));
    };

    transport.send(null);
  }

  return xhrRequest;

};