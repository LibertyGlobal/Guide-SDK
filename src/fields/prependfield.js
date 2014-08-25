/**
 * Prepend field differs from other fields with it`s behaviour on filtering. Instead of being added to the arguments of request this field should be added to URL path.
 * @namespace LGI.Guide.fields
 * @class PrependField
 * @extends AbstractField
 * @tutorial Typical case for using PrependField is to find broadcasts by ChannelIds.
 */

function PrependField(name, prefixString) {
    AbstractField.call(this, name);
    this.prefixString = prefixString;
}

PrependField.prototype = Object.create(AbstractField.prototype);

/**
 * Adds = filtering operation.
 * @method PrependField#equalTo
 * @param operand
 */
PrependField.prototype.equalTo = function (operand) {
    return this._getURLModificationObject(this._modifyURL, operand);
};

PrependField.prototype._modifyURL = function (URL, stringValue) {
    var lastSlashIndex = URL.lastIndexOf('/');
    var processedValue = '/' + this.prefixString + '/' + stringValue;
    URL = URL.substr(0, lastSlashIndex) + processedValue + URL.substr(lastSlashIndex);
    return URL;
}