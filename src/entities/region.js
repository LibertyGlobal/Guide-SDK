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