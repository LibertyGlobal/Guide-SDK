var guide = require('../../dist/lgi-guide.js');

var onDataRetrieved = function(d){
    console.log(d);
    this.each(function(element){
        console.log(element);
    })
};

guide.config.region = 'IE';
guide.Broadcast.create()
    .limit(256)
    .fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.START, LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL_NAME, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.IMAGE_LINK)
    .filter(LGI.Guide.Broadcast.START.greaterThan(nowDate))
    .filter(LGI.Guide.Broadcast.CHANNEL_NAME.equalTo('Discovery'))
    .findOne(onBroadcastsReceived);