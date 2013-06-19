function AbstractRequest(resource) {
    this.resource = resource;
    this.parameters = {};
}

AbstractRequest.prototype.filter = function () {
    var filters = Array.prototype.slice.call(arguments);
    var resource = this.resource;

    filters = filters.reduce(function (memo, filter) {
        if (filter) {
            var pair = filter.split('.');

            memo.push(pair[0] === resource ? pair[1] : filter);
        }

        return memo;
    }, []);

    this.parameters.filter = (this.parameters.filter || []).concat(filters);

    return this;
};

AbstractRequest.prototype.sortBy = function (field, ascending) {
    var name = field.toString();
    var pair = name.split('.');
    var value = pair[0] === this.resource ? pair[1] : name;
    var direction = ascending ? 'asc' : 'desc';

    this.parameters.sort = value + '(' + direction + ')';

    this.sortBy = function () {
        throw new Error('Sort field already applied');
    };

    return this;
};

AbstractRequest.prototype.limitTo = function (limit) {
    this.parameters.limit = limit;

    this.limitTo = function () {
        throw new Error('Limit already applied');
    };

    return this;
};

AbstractRequest.prototype.expose = function () {
    this.parameters.show = Array.prototype.slice.call(arguments);

    return this;
};

AbstractRequest.prototype.buildFields = function (result) {
    var fields = this.parameters.show;
    var resource = this.resource;

    if (!fields || !fields.length) {
        fields = this.listDefaultFields();
    }

    fields = fields.reduce(function (memo, field) {
        if (field) {
            var name = field.toString();
            var pair = name.split('.');
            var item = pair[0] === resource ? pair[1] : name;

            if (memo.indexOf(item) === -1) {
                memo.push(item);
            }
        }

        return memo;
    }, []);

    result.push('show=' + fields.join(','));
};

AbstractRequest.prototype.listDefaultFields = function () {
    return [];
};

AbstractRequest.prototype.buildFilters = function (result) {
    var filter = this.parameters.filter;

    if (filter && filter.length) {
        result.push.apply(result, filter);
    }
};

AbstractRequest.prototype.buildSort = function (result) {
    var sort = this.parameters.sort;

    if (sort) {
        result.push('sort=' + sort);
    }
};

AbstractRequest.prototype.buildLimit = function (result) {
    var limit = this.parameters.limit;

    result.push('maxBatchSize=' + (limit || 1000));
};

AbstractRequest.prototype.buildDefaultParameters = function (result) {
    this.buildFields(result);
    this.buildFilters(result);
    this.buildSort(result);
    this.buildLimit(result);
};

AbstractRequest.prototype.buildURL = function (url, parameters) {
    if (parameters.length) {
        return url + '?' + parameters.join('&');
    }

    return url;
};

AbstractRequest.prototype.toString = function () {
    throw new Error('Not implemented');
};

AbstractRequest.prototype.send = function (options) {
    // TODO: implement
    throw new Error('Not implemented');
};