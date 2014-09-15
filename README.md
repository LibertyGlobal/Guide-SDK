TV Guide JS SDK
=====================

Provides a simple way to retrieve TV schedule data.

Get the latest version
----------------------

- [lgi-guide.js](https://raw.githubusercontent.com/LibertyGlobal/Guide-SDK/master/dist/lgi-guide.js) (raw source with comments)
- [lgi-guide.min.js](https://raw.githubusercontent.com/LibertyGlobal/Guide-SDK/master/dist/lgi-guide.min.js) (minified)



Basic concepts
--------------

SDK contains few public classes representing API entities:

* Video (a piece of video material, could be movie or news issue etc.)
* Broadcast (a piece of video at a particular time on a particular channel,  includes a video object)

Entities are query builders encapsulating data retrieval functions, filtering, sorting and paging in order to provide simple API facade.


Usage examples
--------------

####Regions####
Always specify region before start.

	LGI.Guide.config.region = 'NL';

Following regions are supported:

- `NL` Netherlands
- `IE` Ireland
- `HU` Hungary


####Basic example####
Let's look at the most basic example - getting list of broadcasts for Netherlands without any filtering or sorting:
	
    var broadcastsData = LGI.Guide.Video.create()
    	.findOne(dataReceivedCallback);
    	
Response:

    [
    	{selfLink: Object},
		{selfLink: Object},
		{selfLink: Object},
		{selfLink: Object}
	]

Probably you are wondered with result containing only _selfLink property. This happen because it is important to minimize response size by getting only data you really need.

####Specifying fields to retrieve####
Let`s specify fields to retrieve as following:
    
    LGI.Guide.Video.create()
    	.fields(LGI.Guide.Video.ID, LGI.Guide.Video.TITLE)
    	.findOne(dataReceivedCallback);
    	
Response:
	
	[
		{id: "7shi89fww", title: "Oorlogsverhalen (3)", selfLink: Object},
		{id: "3yaqesymo", title: "Millivres - Point of View", selfLink: Object},
		{id: "5jzc9n9c1", title: "Mahabharat", selfLink: Object},
		{id: "9l2i1y2sb", title: "Baggage Battles", selfLink: Object}
	]
    
Much better! Now we have videos with IDs and titles.

####Limiting response size####
You can limit number of broadcasts or videos in response.

    LGI.Guide.Broadcast.create()
    	.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.TITLE)
    	.limit(2)
    	.findOne(dataReceivedCallback);

####Paging and difference between findOne, findAll and findNext methods####
API supports paging and three data retrieval methods are supported:

* __findOne__ - retrieves first page of data,
* __findNext__ - retrieves next page of data,
* __findAll__ - retrieves all data pages available for your request.

You can set particular page size by using __limit()__.


####Filtering####
Most advanced tool for specific data retrieval is filtering. In this example we will get only broadcasts with category equal to sports.

    LGI.Guide.Broadcast.create()
    	.filter(LGI.Guide.Broadcast.category.isEqual('sports'))
    	.findAll(dataReceivedCallback);


####Sorting####
This will retrieve a page of broadcasts sorted by popularity:

    LGI.Guide.Broadcast.create()
    	.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.TITLE)
        .sort(LGI.Guide.Broadcast.POPULARITY, 'desc')
        .findOne(dataReceivedCallback);

Almost all fields are sortable.

####Entities fields available for sorting, filtering, retrieval####

#####Broadcast#####
- ID
- START (date/time of broadcast`s start as ISO formatted date without a seconds e.g. 2014-06-24T09:23Z)
- END (date/time of broadcast`s end as ISO formatted date without a seconds e.g. 2014-06-24T09:23Z)
- CRID
- IMI
- CHANNEL_NAME
- VIDEO_ID
- TITLE
- SYNOPSIS
- AGE_RATING
- CATEGORY
- RECORD_LINK
- CAST
- DIRECTORS
- WRITERS
- IMAGE_LINK
- BPM
- POPULARITY

#####Video#####
- ID
- TITLE
- SYNOPSIS
- CATEGORY
- SEASON
- EPISODE
- CRID
- STATISTICS
- AGE_RATING
- IMAGE_LINK
- OPENGRAPH_LINK
- SELF_LINK
- CAST
- DIRECTORS
- WRITERS
- BPM
- POPULARITY
- MORE_LINK

#####Channel#####
- REF
- NAME
- LOGICAL_POSITION
- LOGO_LINK
- BROADCASTS_LINK
- OPENGRAPH_LINK
- SELF_LINK
- GENRES
- BROADCASTS


    
Look at [JSDoc](http://cdn.rawgit.com/LibertyGlobal/Guide-SDK/master/doc/index.html) for more details.
Start to develop from exploring demos folder of repository.

Bug tracker
-----------

Have a bug? Please [create an issue on GitHub](https://github.com/LibertyGlobal/sdk/issues)
