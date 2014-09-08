var guide = require('../../dist/lgi-guide-sdk.js');

var onDataRetrieved = function(d){
    console.log(d);
    this.each(function(element){
        console.log(element);
    })
};

guide.Broadcast.create().findAll(onDataRetrieved);