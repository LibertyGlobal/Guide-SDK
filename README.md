![Kraken beta logo](https://github.com/LibertyGlobal/Kraken-SDK/blob/master/doc/img/logo-kraken.png?raw=true)

Kraken JavaScript SDK
=====================

SDK provides simple way to retrieve TV schedule data.

Explore [official page](http://appdev.io) and [JSDoc](http://htmlpreview.github.io/?http://raw.github.com/LibertyGlobal/Kraken-SDK/master/doc/index.html) for more information.


Basic concepts
--------------

SDK contains few public classes representing API entities:

* Channel
* Broadcast
* Country
* City

Entities work very similar to jQuery objects. They encapsulate request building, request executing logic and data collection storage.


Usage examples
--------------

####Basic example####
Let`s look at most basic example - getting list of countries supported by API.
This code creates new Country object and gets all records without filtering or sorting.

    kraken.Country.create().findAll(dataReceivedCallback);


####Limiting response size####
You are free to get only first two countries. Let`s modify our example.

    kraken.Country.create()
    .limit(2)
    .findOne(dataReceivedCallback);


####Paging and difference between findOne, findAll and findNext methods####
API supports paging and to work with it on client side three data retrieval methods are supported:

* __findOne__ - retrieves first page of data,
* __findNext__ - retrieves next page of data,
* __findAll__ - retrieves all data pages available for your request.

Maximum possible response (page) size is 128 records and default size is the same.
You can set particular page size by using `limit()`.


####Specifying fields to retrieve####
It`s quite important to get only data you really need, so please, specify fields as following.

    kraken.config.region = 'NL';
    kraken.Channel.create()
    .fields(kraken.Channel.TITLE, kraken.Channel.ID)
    .findAll(dataReceivedCallback);


####Filtering####
Most advanced tool for specific data retrieval is filtering. In this example we will get only broadcasts with category equal to sports.

    kraken.config.region = 'NL';
    kraken.Broadcast.create()
    .filter(kraken.Broadcast.category.isEqual('sports'))
    .findAll(dataReceivedCallback);


####Sorting####
This will get all channels sorted by title:

    kraken.config.region = 'NL';
    kraken.Channel.create()
    .sort(kraken.Channel.title, 'desc')
    .findOne(dataReceivedCallback);

BTW sorting on Broadcast class instances will not work in beta.


Bug tracker
-----------

Have a bug? Please [create an issue on GitHub](https://github.com/LibertyGlobal/sdk/issues)!