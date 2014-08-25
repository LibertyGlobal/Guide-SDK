var nodeRequest = function () {
    function nodeRequest(url, callback, errorCallback) {
        if (url.indexOf('http:') === -1) {
            url = 'http:' + url;
        }

        var http = require('http');
        var urlmodule = require('url');
        var urlData = urlmodule.parse(url, true);

        var options = {
            host: urlData.hostname,
            port: 80,
            method: 'GET',
            path: urlData.path
        };

        var reqGet = http.request(options, function (res) {
            res.on('data', function (d) {
                callback(JSON.parse(d));
            });
        });

        reqGet.end();

        reqGet.on('error', function (res) {
            if (errorCallback) {
                errorCallback(res);
            } else {
                console.warn('KrakenSDK: Error during request to ' + url);
            }
        });
    }

    return nodeRequest;
};