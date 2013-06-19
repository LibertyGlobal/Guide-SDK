var NumericField = Object.create(AbstractField);

var numeric = function (name) {
    return NumericField.create(name);
};

makeEqualable(NumericField);
makeComparable(NumericField);