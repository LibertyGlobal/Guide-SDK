var nodeRequest = function(){
    function nodeRequest(url, callback, errorCallback) {
        var http = require('http');
        var urlmodule = require('url');

        var urlData = urlmodule.parse(url, true);

        var options = {
            host: urlData.hostname,
            port: 80,
            method: 'GET',
            path: urlData.path
        };

        var temporaryCallback = function (res) {
            callback(res);
        }

        var reqGet = http.request(options, function (res) {
            res.on('data', function (d) {
                temporaryCallback(JSON.parse(d));
            });
        });

        reqGet.end();

        reqGet.on('error', function(res){
            if (errorCallback){
                errorCallback(res);
            } else {
                console.warn('KrakenSDK: Error during request to ' + url);
            }
        });
    }

    return nodeRequest;
};