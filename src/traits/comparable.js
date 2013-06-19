var TComparable = new Trait({
    lessThan: function (value) {
        return this.name + '<' + value;
    },

    greaterThan: function (value) {
        return this.name + '>' + value;
    },

    lessThanOrEqualTo: function (value) {
        return this.name + '<=' + value;
    },

    greaterThanOrEqualTo: function (value) {
        return this.name + '>=' + value;
    }
});