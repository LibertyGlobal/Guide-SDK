var makeMatchable = (function () {
    function matches(value) {
        return this.name + '~' + value;
    }

    return function (object) {
        object.matches = matches;

        return object;
    };
}());