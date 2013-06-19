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