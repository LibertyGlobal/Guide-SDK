var makeComparable = (function () {
    function lessThan(value) {
        return this.name + '<' + value;
    }

    function lessThanOrEqualTo(value) {
        return this.name + '<=' + value;
    }

    function greaterThan(value) {
        return this.name + '>' + value;
    }

    function greaterThanOrEqualTo(value) {
        return this.name + '>=' + value;
    }

    return function (object) {
        object.lessThan = lessThan;
        object.lessThanOrEqualTo = lessThanOrEqualTo;
        object.greaterThan = greaterThan;
        object.greaterThanOrEqualTo = greaterThanOrEqualTo;

        return object;
    };
}());