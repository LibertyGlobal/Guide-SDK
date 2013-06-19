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