var nodeRequest = function(){
    function nodeRequest(url, params, callback) {
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
    }

    return nodeRequest;
};