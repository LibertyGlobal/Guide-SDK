var AbstractField = {
    create: function (name) {
        var object = Object.create(this);

        object.name = name;

        return object;
    },

    toString: function () {
        return this.name;
    }
};