(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
}(this, function () {

    //= src/traits
    //= src/fields
    //= src/requests
    //= src/entities

    return SDK;

}));