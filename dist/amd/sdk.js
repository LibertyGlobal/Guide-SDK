// SDK
// ----------------------------------
// v0.0.1
//
// Copyright (c) 2013 Joris Snaras <jsnaras@libertyglobal.com>

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
}(this, function () {

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

    var TEqualable = new Trait({
        equalTo: function (value) {
            return this.name + '=' + value;
        }
    });

    var TMatchable = new Trait({
        matches: function (value) {
            return this.name + '~' + value;
        }
    });

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

    var NumericField = Object.create(AbstractField);
    
    TEqualable.useIn(NumericField);
    TComparable.useIn(NumericField);

    var TextualField = Object.create(AbstractField);
    
    TEqualable.useIn(TextualField);
    TMatchable.useIn(TextualField);

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

    function BroadcastRequest(limit) {
        AbstractRequest.call(this, BroadcastRequest.resource, limit || 0);
    }
    
    BroadcastRequest.resource = 'broadcast';
    BroadcastRequest.url = 'broadcasts.json';
    
    BroadcastRequest.prototype = Object.create(AbstractRequest.prototype);
    
    BroadcastRequest.prototype.listDefaultFields = function () {
        return [
            SDK.Broadcast.ID,
            SDK.Broadcast.CHANNEL_ID,
            SDK.Broadcast.TITLE,
            SDK.Broadcast.START_TIME,
            SDK.Broadcast.END_TIME
        ];
    };
    
    BroadcastRequest.prototype.toString = function () {
        var parameters = [];
    
        this.buildDefaultParameters(parameters);
    
        return this.buildURL(BroadcastRequest.url, parameters);
    };

    function ChannelRequest(limit) {
        AbstractRequest.call(this, ChannelRequest.resource, limit || 0);
    }
    
    ChannelRequest.resource = 'channel';
    ChannelRequest.url = 'channels.json';
    
    ChannelRequest.prototype = Object.create(AbstractRequest.prototype);
    
    ChannelRequest.prototype.listDefaultFields = function () {
        return [
            SDK.Channel.ID,
            SDK.Channel.NAME,
            SDK.Channel.POSITION
        ];
    };
    
    ChannelRequest.prototype.toString = function () {
        var parameters = [];
    
        this.buildDefaultParameters(parameters);
    
        return this.buildURL(ChannelRequest.url, parameters);
    };

    function RegionRequest(limit) {
        AbstractRequest.call(this, RegionRequest.resource, limit || 0);
    }
    
    RegionRequest.resource = 'region';
    RegionRequest.url = 'regions.json';
    
    RegionRequest.prototype = Object.create(AbstractRequest.prototype);
    
    RegionRequest.prototype.listDefaultFields = function () {
        return [
            SDK.Region.ID,
            SDK.Region.NAME,
            SDK.Region.CHANNEL_LINEUP_LINK
        ];
    };
    
    RegionRequest.prototype.toString = function () {
        var parameters = [];
    
        this.buildDefaultParameters(parameters);
    
        return this.buildURL(RegionRequest.url, parameters);
    };

    SDK.Broadcast = {
        SELF_LINK: TextualField.create('broadcast.selfLink'),
        ID: TextualField.create('broadcast.id'),
        CHANNEL_ID: TextualField.create('broadcast.channelId'),
        TITLE: TextualField.create('broadcast.title'),
        SYNOPSIS: TextualField.create('broadcast.synopsis'),
        CATEGORY: TextualField.create('broadcast.category'),
        VIDEO_ID: TextualField.create('broadcast.videoId'),
        START_TIME: NumericField.create('broadcast.start'),
        END_TIME: NumericField.create('broadcast.end'),
        IMAGE_LINK: NumericField.create('broadcast.imageLink'),
        MORE_LINK: NumericField.create('broadcast.moreLink'),
        OPENGRAPH_LINK: NumericField.create('broadcast.opengraphLink'),
    
        one: function () {
            return new BroadcastRequest().limit(1);
        },
    
        all: function () {
            return new BroadcastRequest();
        }
    };

    SDK.Channel = {
        SELF_LINK: TextualField.create('channel.selfLink'),
        ID: TextualField.create('channel.channelId'),
        NAME: TextualField.create('channel.name'),
        POSITION: TextualField.create('channel.logicalPosition'),
        REGION_ID: TextualField.create('channel.regionId'),
        BROADCASTS_LINK: TextualField.create('channel.broadcastsLink'),
        OPENGRAPH_LINK: TextualField.create('channel.opengraphLink'),
    
        one: function () {
            return new ChannelRequest().limit(1);
        },
    
        all: function () {
            return new ChannelRequest();
        }
    };

    SDK.Region = {
        SELF_LINK: TextualField.create('region.selfLink'),
        ID: TextualField.create('region.id'),
        NAME: TextualField.create('region.name'),
        CHANNEL_LINEUP_LINK: TextualField.create('region.channelLineupLink'),
        TOP_BROADCASTS_LINK: TextualField.create('region.topBroadcastsLink'),
        TOP_VIDEOS_LINK: TextualField.create('region.topVideosLink'),
    
        one: function () {
            return new RegionRequest(1);
        },
    
        all: function () {
            return new RegionRequest();
        }
    };

    return SDK;

}));