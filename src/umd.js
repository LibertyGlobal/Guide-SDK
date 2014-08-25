(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.LGI = {};
        root.LGI.Guide = factory();
    }
}(this, function () {

    //= main

    return LGI.Guide;

}));
