/**
 * @namespace utils
 * @module polyfills
 */

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
Array.isArray = Array.isArray || function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
};

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {
        var T, k;

        if (this == null) {
            throw new TypeError("this is null or not defined");
        }

        var O = Object(this);
        var len = O.length >>> 0;

        if (Object.prototype.toString.call(callback) !== "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }

        if (thisArg) {
            T = thisArg;
        }

        k = 0;

        while (k < len) {
            var kValue;

            if (Object.prototype.hasOwnProperty.call(O, k)) {
                kValue = O[ k ];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.map) {
    Array.prototype.map = function (fn, ctx) {

        if (this === void 0 || this === null || typeof fn !== "function") throw new TypeError

        var t = Object(this),
            len = t.length >>> 0,
            noCtx = (ctx === void 0 || ctx === null),
            response = new Array(len)

        for (var i = 0; i < len; i++) {
            if (i in t) {
                if (noCtx) {
                    response[i] = fn(t[i], i, t)
                } else {
                    response[i] = fn.call(ctx, t[i], i, t)
                }
            }
        }

        return response
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every) {
    Array.prototype.every = function (fun /*, thisp */) {
        "use strict";

        if (this == null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t && !fun.call(thisp, t[i], i, t))
                return false;
        }

        return true;
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp*/) {
        "use strict";

        if (this == null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;

        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) {
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (fn, initialValue) {

        if (this === void 0 || this === null || typeof fn !== "function") throw new TypeError

        var t = Object(this),
            len = t.length >>> 0,
            hasInitialValue = (initialValue !== void 0 && initialValue !== null)

        // no value to return if no initial value and an empty array
        if (len == 0 && !hasInitialValue) throw new TypeError

        var k = 0, accumulator

        if (hasInitialValue) {
            accumulator = initialValue
        } else {
            do {
                if (k in t) {
                    accumulator = t[k++]
                    break
                }

                // if array contains no values, no initial value to return
                if (++k >= len) throw new TypeError
            }
            while (true)
        }

        while (k < len) {
            if (k in t) accumulator = fn(accumulator, t[k], k, t)
            k++
        }

        return accumulator
    }
}


// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some) {
    Array.prototype.some = function (fn, ctx) {

        if (this === void 0 || this === null || typeof fn !== "function") throw new TypeError

        var t = Object(this),
            len = t.length >>> 0,
            noCtx = (ctx === void 0 || ctx === null)

        for (var i = 0; i < len; i++) {
            if (i in t) {
                if (noCtx) {
                    if (fn(t[i], i, t)) return true
                } else {
                    if (fn.call(ctx, t[i], i, t)) return true
                }
            }
        }

        return false;
    };
}

// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (obj) {

        if (typeof this !== 'function') throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")

        var slice = Array.prototype.slice,
            args = slice.call(arguments, 1),
            self = this,
            nop = function () {},
            bound = function () {
                if (nop.prototype && this instanceof nop) {
                    var result = self.apply(new nop, args.concat(slice.call(arguments)))
                    return (Object(result) === result) ? result : self
                } else {
                    return self.apply(obj, args.concat(slice.call(arguments)))
                }
            };

        nop.prototype = self.prototype;
        bound.prototype = new nop();

        return bound;
    };
}

if (!Object.keys) {
    Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')

            var result = [];

            for (var prop in obj) {
                if (hasOwnProperty.call(obj, prop)) result.push(prop)
            }

            if (hasDontEnumBug) {
                for (var i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
                }
            }
            return result
        }
    })()
}

if (!Object.create) {
    Object.create = (function () {
        function F() {
        }

        return function (o) {
            if (arguments.length != 1) {
                throw new Error('Object.create implementation only accepts one parameter.');
            }

            F.prototype = o;
            return new F();
        }
    })()
}