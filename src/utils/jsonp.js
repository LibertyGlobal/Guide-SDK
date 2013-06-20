/**
 * Module for ajax, JSONP
 * @namespace utils
 * @module jsonp
 */

(function (kraken) {
    kraken.jsonp = (function () {
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

        function jsonp(url, params, callback, callbackName) {
            var query = (url || '').indexOf('?') === -1 ? '?' : '&', key;

            callbackName = (callbackName || config.callbackName || 'callback');
            var uniqueName = callbackName + "_json" + (++counter);

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
})(typeof exports === 'undefined' ? this.kraken : exports);