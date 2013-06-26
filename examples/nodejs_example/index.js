var kraken = require('../../dist/kraken.js');

var onDataRetrieved = function(d){
    console.log(d);
    this.each(function(element){
        console.log(element);
    })
};

kraken.Country.create().findAll(onDataRetrieved);