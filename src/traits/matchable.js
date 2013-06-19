var TMatchable = new Trait({
    matches: function (value) {
        return this.name + '~' + value;
    }
});