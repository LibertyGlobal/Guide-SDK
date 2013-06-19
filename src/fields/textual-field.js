var TextualField = Object.create(AbstractField);

var textual = function (name) {
    return TextualField.create(name);
};

makeEqualable(TextualField);
makeMatchable(TextualField);