var makeEqualable = (function () {
    function equalTo(value ) {
        return this.name + '=' + value;
    }

    return function (object) {
        object.equalTo = equalTo;

        return object;
    }
}());