// SDK
// ----------------------------------
// v0.0.2
//
// Copyright (c) 2013 Joris Snaras <jsnaras@libertyglobal.com>

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
}(this, function () {

    var makeComparable = (function () {
        function lessThan(value) {
            return this.name + '<' + value;
        }
    
        function lessThanOrEqualTo(value) {
            return this.name + '<=' + value;
        }
    
        function greaterThan(value) {
            return this.name + '>' + value;
        }
    
        function greaterThanOrEqualTo(value) {
            return this.name + '>=' + value;
        }
    
        return function (object) {
            object.lessThan = lessThan;
            object.lessThanOrEqualTo = lessThanOrEqualTo;
            object.greaterThan = greaterThan;
            object.greaterThanOrEqualTo = greaterThanOrEqualTo;
    
            return object;
        };
    }());
    var makeEqualable = (function () {
        function equalTo(value ) {
            return this.name + '=' + value;
        }
    
        return function (object) {
            object.equalTo = equalTo;
    
            return object;
        }
    }());
    var makeMatchable = (function () {
        function matches(value) {
            return this.name + '~' + value;
        }
    
        return function (object) {
            object.matches = matches;
    
            return object;
        };
    }());
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
    
    var numeric = function (name) {
        return NumericField.create(name);
    };
    
    makeEqualable(NumericField);
    makeComparable(NumericField);
    var TextualField = Object.create(AbstractField);
    
    var textual = function (name) {
        return TextualField.create(name);
    };
    
    makeEqualable(TextualField);
    makeMatchable(TextualField);
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
    
    AbstractRequest.prototype.fields = function () {
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
        SELF_LINK: textual('broadcast.selfLink'),
        ID: textual('broadcast.id'),
        CHANNEL_ID: textual('broadcast.channelId'),
        TITLE: textual('broadcast.title'),
        SYNOPSIS: textual('broadcast.synopsis'),
        CATEGORY: textual('broadcast.category'),
        VIDEO_ID: textual('broadcast.videoId'),
        START_TIME: numeric('broadcast.start'),
        END_TIME: numeric('broadcast.end'),
        IMAGE_LINK: textual('broadcast.imageLink'),
        MORE_LINK: textual('broadcast.moreLink'),
        OPENGRAPH_LINK: numeric('broadcast.opengraphLink'),
    
        one: function () {
            return new BroadcastRequest().limit(1);
        },
    
        all: function () {
            return new BroadcastRequest();
        }
    };
    SDK.Channel = {
        SELF_LINK: textual('channel.selfLink'),
        ID: textual('channel.channelId'),
        NAME: textual('channel.name'),
        POSITION: textual('channel.logicalPosition'),
        REGION_ID: textual('channel.regionId'),
        BROADCASTS_LINK: textual('channel.broadcastsLink'),
        OPENGRAPH_LINK: textual('channel.opengraphLink'),
    
        one: function () {
            return new ChannelRequest().limit(1);
        },
    
        all: function () {
            return new ChannelRequest();
        }
    };
    SDK.Region = {
        SELF_LINK: textual('region.selfLink'),
        ID: textual('region.id'),
        NAME: textual('region.name'),
        CHANNEL_LINEUP_LINK: textual('region.channelLineupLink'),
        TOP_BROADCASTS_LINK: textual('region.topBroadcastsLink'),
        TOP_VIDEOS_LINK: textual('region.topVideosLink'),
    
        one: function () {
            return new RegionRequest(1);
        },
    
        all: function () {
            return new RegionRequest();
        }
    };

    return SDK;

}));