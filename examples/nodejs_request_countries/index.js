var kraken = require('../../dist/lgi-guide-sdk.js');

var onDataRetrieved = function(d){
    console.log(d);
    this.each(function(element){
        console.log(element);
    })
};

LGI.Guide.Region.create().findAll(onDataRetrieved);