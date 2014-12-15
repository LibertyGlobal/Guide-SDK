var mafRequest = function () {

    return function mafRequest(url, callback, errorCallback) {
        new Request({
            method: 'GET',
            url: url,
            headers: {
                'X-Auth-Id': 'dc573c37',
                'X-Auth-Key': 'f4521ced0cb9af73374731a77b2f21f6'
            },
            
            onSuccess: function (json) {
                if (typeof callback === 'function') {
                    callback(json);
                }
            },
            
            onFailure: function (error) {
                if (typeof errorCallback === 'function') {
                    errorCallback(error);
                }
            },

            onError: function (error) {
                if (typeof errorCallback === 'function') {
                    errorCallback(error);
                }
            }
        }).send();
    };

};
