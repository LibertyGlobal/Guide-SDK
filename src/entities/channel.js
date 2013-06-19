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