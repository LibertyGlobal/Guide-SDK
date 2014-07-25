![Kraken beta logo](https://github.com/LibertyGlobal/Kraken-SDK/blob/master/doc/img/logo-kraken.png?raw=true)

Kraken JavaScript SDK
=====================

SDK provides simple way to retrieve TV schedule data.

Explore [official page](http://appdev.io) and [JSDoc](http://htmlpreview.github.io/?http://raw.github.com/LibertyGlobal/Kraken-SDK/master/doc/index.html) for more information.


Basic concepts
--------------

SDK contains few public classes representing API entities:

* Broadcast
* Channel
* Video
* Region

Entities in fact are query builders and encapsulate logic for retrieving data,  filtering, sorting and paging.


Usage examples
--------------

####Basic example####
Let's look at the most basic example - getting list of regions supported by API.
Following code gets all records without filtering or sorting.

    kraken.Region.create().findAll(dataReceivedCallback);
    
    //Response
    0: Object
        id: "HU"
    1: Object
        id: "IE"
    2: Object
        id: "NL"


####Limiting response size####
You can limit number of countries in response. Let`s modify previous example.

    kraken.Region.create()
    .limit(2)
    .findOne(dataReceivedCallback);
    
    //Response
    0: Object
        id: "HU"
    1: Object
        id: "IE"

This applies to every kind of entity: broadcasts, videos, channels.

####Paging and difference between findOne, findAll and findNext methods####
API supports paging and three data retrieval methods are supported:

* __findOne__ - retrieves first page of data,
* __findNext__ - retrieves next page of data,
* __findAll__ - retrieves all data pages available for your request.

You can set particular page size by using `limit()`.


####Filtering####
Most advanced tool for specific data retrieval is filtering. In this example we will get only broadcasts with category equal to sports.

    kraken.config.region = 'NL';
    kraken.Broadcast.create()
    .filter(kraken.Broadcast.category.isEqual('sports'))
    .findAll(dataReceivedCallback);


####Sorting####
This will get a page of broadcasts for Ierland sorted by popularity:

    kraken.config.region = 'IE';
    kraken.Broadcast.create()
            .fields(kraken.Broadcast.ID, kraken.Broadcast.TITLE)
            .sort(kraken.Broadcast.POPULARITY, 'desc')
            .findOne(onBroadcastsReceived);

Almost all fields are sortable.


####Specifying fields to retrieve####
Sometimes it is important to minimize response size by getting only data you really need. You can specify fields to retrieve as following.

    kraken.config.region = 'NL';
    kraken.Channel.create()
    .fields(kraken.Channel.NAME, kraken.Channel.REF)
    .findAll(dataReceivedCallback);
    
Keep in mind that retrieving any data on channels, videos or broadcasts needs region configuration.


Bug tracker
-----------

Have a bug? Please [create an issue on GitHub](https://github.com/LibertyGlobal/sdk/issues)!