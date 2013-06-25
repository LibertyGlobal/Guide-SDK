/**
 * Module for ajax, JSONP
 * @namespace kraken
 * @function kraken.jsonp
 */

var jsonp = (function () {
    var counter = 0, head, window = this, config = {};

    function load(url, pfnError) {
        var script = document.createElement('script'),
            done = false;

        script.src = url;
        script.async = true;

        var errorHandler = pfnError || config.error;
        if (typeof errorHandler === 'function') {
            script.onerror = function (ex) {
                errorHandler({url: url, event: ex});
            };
        }

        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            }
        };

        if (!head) {
            head = document.getElementsByTagName('head')[0];
        }
        head.appendChild(script);
    }

    function encode(str) {
        return encodeURIComponent(str);
    }

    function removeParameter(url, parameter) {
        var urlparts = url.split('?');

        if (urlparts.length >= 2) {
            var urlBase = urlparts.shift(); //get first part, and remove from array
            var queryString = urlparts.join("?"); //join it back up

            var prefix = encodeURIComponent(parameter) + '=';
            var pars = queryString.split(/[&;]/g);
            for (var i = pars.length; i-- > 0;)               //reverse iteration as may be destructive
                if (pars[i].lastIndexOf(prefix, 0) !== -1)   //idiom for string.startsWith
                    pars.splice(i, 1);
            url = urlBase + '?' + pars.join('&');
        }
        return url;
    }

    function jsonp(url, params, callback, callbackName) {
        //url = escape(url);

        var query = (url || '').indexOf('?') === -1 ? '?' : '&', key;

        callbackName = (callbackName || config.callbackName || 'callback');
        var uniqueName = callbackName + "_json" + (++counter);

        url = removeParameter(url, callbackName);

        params = params || {};
        for (key in params) {
            if (params.hasOwnProperty(key)) {
                query += encode(key) + "=" + encode(params[key]) + "&";
            }
        }

        window[ uniqueName ] = function (data) {
            callback(data);
            try {
                delete window[ uniqueName ];
            } catch (e) {
            }
            window[ uniqueName ] = null;
        };

        load(url + query + callbackName + '=' + uniqueName);
        return uniqueName;
    }

    function setDefaults(obj) {
        config = obj;
    }

    return jsonp;
})();