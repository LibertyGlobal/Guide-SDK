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