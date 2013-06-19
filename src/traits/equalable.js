var TEqualable = new Trait({
    equalTo: function (value) {
        return this.name + '=' + value;
    }
});