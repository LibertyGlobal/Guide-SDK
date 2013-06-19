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