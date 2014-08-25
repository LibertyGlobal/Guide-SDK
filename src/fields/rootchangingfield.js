/**
 * Root changing field differs from other fields with it`s behaviour on filtering. Instead of being added to the arguments of request this field should be added as root like /broadcasts/1z,2z.json
 * @namespace LGI.Guide.fields
 * @class PrependField
 * @extends AbstractField
 * @tutorial Typical case for using PrependField is to find broadcast by ID.
 */

function RootChangingField(name, prefixString) {
    AbstractField.call(this, name);
    this.prefixString = prefixString;
}

RootChangingField.prototype = Object.create(AbstractField.prototype);

/**
 * Adds = filtering operation.
 * @method PrependField#equalTo
 * @param operand
 */
RootChangingField.prototype.equalTo = function (operand) {
    return this._getURLModificationObject(this._modifyURL, operand);
};

RootChangingField.prototype._modifyURL = function (URL, stringValue) {
    var questionSymbolIndex = URL.indexOf('?') !== -1 ? URL.indexOf('?') : URL.length;
    var pathOfURL = URL.substring(0, questionSymbolIndex);
    var pathWithoutFileName = URL.substring(0, pathOfURL.lastIndexOf('/'));
    var processedValue = '/' + this.prefixString + '/' + stringValue + '.json';

    return URL.replace(pathOfURL, pathWithoutFileName + processedValue);
}