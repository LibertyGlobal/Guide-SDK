function Trait(methods) {
    this.traits = methods ? [ methods ] : [];
}

Trait.prototype.uses = function (trait) {
    this.traits = this.traits.concat(trait.traits);

    return this;
};

Trait.prototype.useIn = function (object) {
    this.traits.forEach(function (trait) {
        Object.keys(trait).forEach(function (name) {
            object[name] = object[name] || trait[name];
        });
    });

    return object;
};

Trait.unimplemented = function (object, traitName) {
    if (typeof object === 'undefined' || typeof traitName === 'undefined') {
        throw new Error('Unimplemented trait property.');
    }

    throw new Error(traitName + ' is not implemented for ' + object);
};