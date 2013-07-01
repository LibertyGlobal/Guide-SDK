var kraken = require('../../dist/kraken-sdk.js');

var onDataRetrieved = function(d){
    console.log(d);
    this.each(function(element){
        console.log(element);
    })
};

kraken.Region.create().findAll(onDataRetrieved);