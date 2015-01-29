Liberty Global Guide SDK
========================

The Liberty Global Guide SDK is a supplementary utility library to the Liberty Global Schedule APIs.
It is written in JavaScript and is designed for front-end and back-end JavaScript applications that
make use of the Liberty Global Schedule APIs.


Table of Contents
-----------------

* [Key Concepts](#key-concepts)
	* [Resources](#resources)
	* [Fields](#fields)
	* [Filter Expressions & Field Types](#expressions)
	* [Request Builder](#request-builder)
* [Usage](#usage)
	* [Versions](#versions)
	* [Initialization](#initialization)
	* [Building Requests](#building-requests)
* [API Documentation](#api-documentation)

---

<a name="key-concepts"></a>
Key Concepts
------------

<a name="resources"></a>
### Resources

The Guide SDK is modelled after the objects operated on by the Schedule API and exposes the following resources:

* __Broadcast__ – meta-data for the transmission of a program with start and end time, etc.
* __Video__ – meta-data for the show or movie with title, genre, staff, etc.
* __Channel__ – meta-data for the TV channel

The resources do not share a direct parent-child relationship, however, they are embeddable – for instance,
if you are requesting a resource of type __Broadcast__, you can embed properties from the
__Video__ object.

<a name="fields"></a>
### Fields

The Schedule API returns only the properties that you ask for in order to minimize the overhead of massive
data transfers. It is therefore important to build queries that explicitly specify the required properties.

Each resource in the Guide SDK exposes its property names as __Fields__ that can be used as constants instead
of hard-coded strings:

| Field                 | Description                                  | Result of .toString() |
|-----------------------|----------------------------------------------|-----------------------|
| `Broadcast.START`     | Represents the *start* property of Broadcast | `broadcast.start`     |
| `Channel.NAME`        | Represents the *name* property of Channel    | `channel.name`        |
| `Video.TITLE`         | Represents the *title* property of Video     | `video.title`         |
| ...                   |                                              |                       |


<a name="expressions"></a>
### Filter Expressions & Field Types

In addition to acting as constants for property names, most __Fields__ have helper methods that can be used
to build __Filter Expressions__ when filtering data:

	Channel.NAME.isEqualTo('RTL')              // .toString() == "channel.name=RTL"
	Video.TITLE.matches('Home')                // .toString() == "video.title~Home"
	Broadcast.START.isGreaterThan('2015-05-10) // .toString() == "broadcast.start>2015-05-10"

There are different types of __Fields__ that expose different helper methods for building
__Filter Expressions__:

* __Field__ – represents the default, non-queryable field;
* __TextField__ – represents a text field and exposes `.isEqualTo()`.
* __FuzzyMatchField__ – represents a "fuzzy-match" field and exposes `.matches()`.
* __NumericField__ – represents a numeric field and exposes `.isGreaterThan()`, `.isLessThan()`, etc.
* __MultiValueField__ – represents a field that can be queried using multiple values.

Please see the [API Documentation](#api-documentation) for an extensive list of field methods.

<a name="request-builder"></a>
### Request Builder

The __Request Builder__ is an object that is returned as a result of calling one of the
façade methods of the `Guide` object:

* `Guide.findBroadcasts()` returns an instance of `RequestBuilder` pre-configured for `Broadcast` requests.
* `Guide.findVideos()` returns an instance of `RequestBuilder` pre-configured for `Video` requests.
* `Guide.findChannels()` returns an instance of `RequestBuilder` pre-configured for `Channel` requests.


The __Request Builder__ exposes a fluent (chainable) interface to build and execute sophisticated requests:

* `.fields(...)` for specifying what properties to fetch;
* `.filter(...)` for narrowing the results down to match specific filter expressions;
* `.sortBy(...)` for specifying the sort field and order;
* `.execute(...)` for ending the building chain and executing the request immediatelly;
* etc.

You can serialize the request URL by calling `.toString()` on the __Request Builder__ instance at any time.

---

<a name="usage"></a>
Usage
-----

<a name="versions"></a>
### Versions

The Guide SDK comes in several versions:

* __jQuery version__ (minified source link, unminified source link)
use this version if you are using __jQuery__ as it utilizes `$.ajax` to make AJAX requests.

* __Angular.js version__ (minified source link, unminified source link)
Exposes `lgi.guide` module with `Guide` service and uses Angular's own `$http` service to make AJAX requests.

* __Standalone version__ (minified source link, unminified source link)
A dependency-free version that uses a simple built-in AJAX request function.

* __Barebones version__ (minified source link, unminified source link)
A dependency-free version without any AJAX adapter. You need to override the  `Guide.request` function yourself.

<a name="initialization"></a>
### Initialization

The Guide SDK has to be initialized before usage. The `initialize()` methods takes a configuration object with
the following properties:

* __region__ – the target region
* __appId__ - the app id (authentication)
* __appKey__ – the app key (authentication)

Example:

	LGI.Guide.initialize({
	  region: 'NL',
	  appId: 'demo',
	  appKey: 'demo'
	});


<a name="building-requests"></a>
### Building Requests

After initializing the Guide SDK you can build and execute requests using the methods of the __Request Builder__:

	LGI.Guide.findBroadcasts()
	  .fields(LGI.Guide.Broadcast.START, LGI.Guide.Broadcast.END)
	  .filter(LGI.Guide.Video.TITLE.matches('Cook'))
	  .execute(onSuccess, onError);

The `onSuccess` or `onError` callback is going to be executed once the response is received, or an error occurs, respectively.

---

<a name="api-documentation"></a>
API Documentation
-----------------

<a name="LGI"></a>
###LGI → <code>object</code>

* [LGI](#LGI) → <code>object</code>
  * [.Guide](#LGI.Guide) → <code>object</code>
    * [.Broadcast](#LGI.Guide.Broadcast) → <code>[Resource](#new_Resource_new)</code>
    * [.Channel](#LGI.Guide.Channel) → <code>[Resource](#new_Resource_new)</code>
    * [.Video](#LGI.Guide.Video) → <code>[Resource](#new_Resource_new)</code>
    * [.initialize(settings)](#LGI.Guide.initialize)
    * [.findBroadcasts(...ids)](#LGI.Guide.findBroadcasts) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [.findVideos(...ids)](#LGI.Guide.findVideos) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [.findChannels(...ids)](#LGI.Guide.findChannels) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [class: ~RequestBuilder](#LGI.Guide..RequestBuilder)
      * [new RequestBuilder(resource, region, baseURL, appId, appKey, request, [ids])](#new_LGI.Guide..RequestBuilder_new)
      * _instance_
        * [.fields(...values)](#LGI.Guide..RequestBuilder#fields) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
        * [.filter(...values)](#LGI.Guide..RequestBuilder#filter) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
        * [.sortBy(field, [order])](#LGI.Guide..RequestBuilder#sortBy) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
        * [.skip(value)](#LGI.Guide..RequestBuilder#skip) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
        * [.limit(value)](#LGI.Guide..RequestBuilder#limit) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
        * [.execute([onSuccess], [onError])](#LGI.Guide..RequestBuilder#execute)
        * [.toString()](#LGI.Guide..RequestBuilder#toString) ⇒ <code>string</code>
    * [class: ~Field](#LGI.Guide..Field) ⇐ <code>[Evaluable](#new_Evaluable_new)</code>
      * [new Field(context, name)](#new_LGI.Guide..Field_new)
    * [class: ~NumericField](#LGI.Guide..NumericField) ⇐ <code>[Field](#LGI.Guide..Field)</code>
      * [new NumericField(context, name)](#new_LGI.Guide..NumericField_new)
      * _instance_
        * [.isLessThan(value)](#LGI.Guide..NumericField#isLessThan) ⇒ <code>[Expression](#new_Expression_new)</code>
        * [.isLessThanOrEqualTo(value)](#LGI.Guide..NumericField#isLessThanOrEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
        * [.isEqualTo(value)](#LGI.Guide..NumericField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
        * [.isGreaterThanOrEqualTo(value)](#LGI.Guide..NumericField#isGreaterThanOrEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
        * [.isGreaterThan(value)](#LGI.Guide..NumericField#isGreaterThan) ⇒ <code>[Expression](#new_Expression_new)</code>
    * [class: ~TextField](#LGI.Guide..TextField) ⇐ <code>[Field](#LGI.Guide..Field)</code>
      * [new TextField(context, name)](#new_LGI.Guide..TextField_new)
      * _instance_
        * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
    * [class: ~FuzzyMatchField](#LGI.Guide..FuzzyMatchField) ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
      * [new FuzzyMatchField(context, name)](#new_LGI.Guide..FuzzyMatchField_new)
      * _instance_
        * [.matches(value)](#LGI.Guide..FuzzyMatchField#matches) ⇒ <code>[Expression](#new_Expression_new)</code>
      * _inherits_
        * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
    * [class: ~MultiValueField](#LGI.Guide..MultiValueField) ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
      * [new MultiValueField(context, name)](#new_LGI.Guide..MultiValueField_new)
      * _instance_
        * [.isIn(...values)](#LGI.Guide..MultiValueField#isIn) ⇒ <code>[Expression](#new_Expression_new)</code>
      * _inherits_
        * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>

<a name="LGI.Guide"></a>
###LGI.Guide → <code>object</code>

* [.Guide](#LGI.Guide) → <code>object</code>
  * [.Broadcast](#LGI.Guide.Broadcast) → <code>[Resource](#new_Resource_new)</code>
  * [.Channel](#LGI.Guide.Channel) → <code>[Resource](#new_Resource_new)</code>
  * [.Video](#LGI.Guide.Video) → <code>[Resource](#new_Resource_new)</code>
  * [.initialize(settings)](#LGI.Guide.initialize)
  * [.findBroadcasts(...ids)](#LGI.Guide.findBroadcasts) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
  * [.findVideos(...ids)](#LGI.Guide.findVideos) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
  * [.findChannels(...ids)](#LGI.Guide.findChannels) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
  * [class: ~RequestBuilder](#LGI.Guide..RequestBuilder)
    * [new RequestBuilder(resource, region, baseURL, appId, appKey, request, [ids])](#new_LGI.Guide..RequestBuilder_new)
    * _instance_
      * [.fields(...values)](#LGI.Guide..RequestBuilder#fields) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
      * [.filter(...values)](#LGI.Guide..RequestBuilder#filter) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
      * [.sortBy(field, [order])](#LGI.Guide..RequestBuilder#sortBy) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
      * [.skip(value)](#LGI.Guide..RequestBuilder#skip) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
      * [.limit(value)](#LGI.Guide..RequestBuilder#limit) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
      * [.execute([onSuccess], [onError])](#LGI.Guide..RequestBuilder#execute)
      * [.toString()](#LGI.Guide..RequestBuilder#toString) ⇒ <code>string</code>
  * [class: ~Field](#LGI.Guide..Field) ⇐ <code>[Evaluable](#new_Evaluable_new)</code>
    * [new Field(context, name)](#new_LGI.Guide..Field_new)
  * [class: ~NumericField](#LGI.Guide..NumericField) ⇐ <code>[Field](#LGI.Guide..Field)</code>
    * [new NumericField(context, name)](#new_LGI.Guide..NumericField_new)
    * _instance_
      * [.isLessThan(value)](#LGI.Guide..NumericField#isLessThan) ⇒ <code>[Expression](#new_Expression_new)</code>
      * [.isLessThanOrEqualTo(value)](#LGI.Guide..NumericField#isLessThanOrEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
      * [.isEqualTo(value)](#LGI.Guide..NumericField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
      * [.isGreaterThanOrEqualTo(value)](#LGI.Guide..NumericField#isGreaterThanOrEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
      * [.isGreaterThan(value)](#LGI.Guide..NumericField#isGreaterThan) ⇒ <code>[Expression](#new_Expression_new)</code>
  * [class: ~TextField](#LGI.Guide..TextField) ⇐ <code>[Field](#LGI.Guide..Field)</code>
    * [new TextField(context, name)](#new_LGI.Guide..TextField_new)
    * _instance_
      * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
  * [class: ~FuzzyMatchField](#LGI.Guide..FuzzyMatchField) ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
    * [new FuzzyMatchField(context, name)](#new_LGI.Guide..FuzzyMatchField_new)
    * _instance_
      * [.matches(value)](#LGI.Guide..FuzzyMatchField#matches) ⇒ <code>[Expression](#new_Expression_new)</code>
    * _inherits_
      * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
  * [class: ~MultiValueField](#LGI.Guide..MultiValueField) ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
    * [new MultiValueField(context, name)](#new_LGI.Guide..MultiValueField_new)
    * _instance_
      * [.isIn(...values)](#LGI.Guide..MultiValueField#isIn) ⇒ <code>[Expression](#new_Expression_new)</code>
    * _inherits_
      * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>

<a name="LGI.Guide.Broadcast"></a>
####Guide.Broadcast → <code>[Resource](#new_Resource_new)</code>
Represents a broadcast resource and its fields

**Properties**

| Name | Type |
| --- | --- |
| IMI | <code>[Field](#LGI.Guide..Field)</code> |
| START | <code>[NumericField](#LGI.Guide..NumericField)</code> |
| END | <code>[NumericField](#LGI.Guide..NumericField)</code> |
| CHANNEL | <code>[Field](#LGI.Guide..Field)</code> |
| BUZZ_PER_MINUTE | <code>[NumericField](#LGI.Guide..NumericField)</code> |
| POPULARITY | <code>[NumericField](#LGI.Guide..NumericField)</code> |

<a name="LGI.Guide.Channel"></a>
####Guide.Channel → <code>[Resource](#new_Resource_new)</code>
Represents a channel resource and its fields

**Properties**

| Name | Type |
| --- | --- |
| REF | <code>[MultiValueField](#LGI.Guide..MultiValueField)</code> |
| NAME | <code>[FuzzyMatchField](#LGI.Guide..FuzzyMatchField)</code> |
| POSITION | <code>[NumericField](#LGI.Guide..NumericField)</code> |
| LOGO_LINK | <code>[Field](#LGI.Guide..Field)</code> |
| OPENGRAPH_LINK | <code>[Field](#LGI.Guide..Field)</code> |

<a name="LGI.Guide.Video"></a>
####Guide.Video → <code>[Resource](#new_Resource_new)</code>
Represents a video resource and its fields

**Properties**

| Name | Type |
| --- | --- |
| CRID | <code>[Field](#LGI.Guide..Field)</code> |
| TITLE | <code>[FuzzyMatchField](#LGI.Guide..FuzzyMatchField)</code> |
| SHORT_SYNOPSIS | <code>[Field](#LGI.Guide..Field)</code> |
| SYNOPSIS | <code>[Field](#LGI.Guide..Field)</code> |
| CATEGORY | <code>[FuzzyMatchField](#LGI.Guide..FuzzyMatchField)</code> |
| SEASON | <code>[NumericField](#LGI.Guide..NumericField)</code> |
| EPISODE | <code>[NumericField](#LGI.Guide..NumericField)</code> |
| STATISTICS | <code>[Field](#LGI.Guide..Field)</code> |
| AGE_RATING | <code>[TextField](#LGI.Guide..TextField)</code> |
| CAST | <code>[Field](#LGI.Guide..Field)</code> |
| DIRECTORS | <code>[Field](#LGI.Guide..Field)</code> |
| WRITERS | <code>[Field](#LGI.Guide..Field)</code> |
| IMAGE_LINK | <code>[Field](#LGI.Guide..Field)</code> |
| OPENGRAPH_LINK | <code>[Field](#LGI.Guide..Field)</code> |
| RECORD_LINK | <code>[Field](#LGI.Guide..Field)</code> |

<a name="LGI.Guide.initialize"></a>
####Guide.initialize(settings)
Initializes the Guide for the given region.

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | The settings object |
| settings.region | <code>string</code> | Target region code |
| settings.appId | <code>string</code> | App id (used for authentication) |
| settings.appKey | <code>string</code> | App key (used for authentication) |

**Throws**:

- <code>TypeError</code> Invalid configuration object
- <code>TypeError</code> Invalid region code
- <code>TypeError</code> Invalid app id
- <code>TypeError</code> Invalid app key

<a name="LGI.Guide.findBroadcasts"></a>
####Guide.findBroadcasts(...ids) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Takes zero or more ids of broadcasts and returns a
pre-configured instance of RequestBuilder for Broadcast resources.

| Param | Type | Description |
| --- | --- | --- |
| ...ids | <code>string</code> | Zero or more broadcast ids |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Instance of RequestBuilder for Broadcast resources
<a name="LGI.Guide.findVideos"></a>
####Guide.findVideos(...ids) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Takes zero or more ids of videos and returns a
pre-configured instance of RequestBuilder for Video resources.

| Param | Type | Description |
| --- | --- | --- |
| ...ids | <code>string</code> | Zero or more video ids |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Instance of RequestBuilder for Video resources
<a name="LGI.Guide.findChannels"></a>
####Guide.findChannels(...ids) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Takes zero or more ids (refs) of channels and returns a
pre-configured instance of RequestBuilder for Channel resources.

| Param | Type | Description |
| --- | --- | --- |
| ...ids | <code>string</code> | Zero or more channel ids (refs) |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Instance of RequestBuilder for Channel resources
<a name="LGI.Guide..RequestBuilder"></a>
####class: Guide~RequestBuilder
**Access:** protected

* [class: ~RequestBuilder](#LGI.Guide..RequestBuilder)
  * [new RequestBuilder(resource, region, baseURL, appId, appKey, request, [ids])](#new_LGI.Guide..RequestBuilder_new)
  * _instance_
    * [.fields(...values)](#LGI.Guide..RequestBuilder#fields) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [.filter(...values)](#LGI.Guide..RequestBuilder#filter) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [.sortBy(field, [order])](#LGI.Guide..RequestBuilder#sortBy) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [.skip(value)](#LGI.Guide..RequestBuilder#skip) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [.limit(value)](#LGI.Guide..RequestBuilder#limit) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
    * [.execute([onSuccess], [onError])](#LGI.Guide..RequestBuilder#execute)
    * [.toString()](#LGI.Guide..RequestBuilder#toString) ⇒ <code>string</code>

<a name="new_LGI.Guide..RequestBuilder_new"></a>
#####new RequestBuilder(resource, region, baseURL, appId, appKey, request, [ids])
Provides a fluent interface for building request queries and
executing the request.

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>object</code> | The resource to request |
| region | <code>string</code> | The code of the target region |
| baseURL | <code>string</code> | The base URL of the API |
| appId | <code>string</code> | The app id (required for authentication) |
| appKey | <code>string</code> | The app key (required for authentication) |
| request | <code>function</code> | The request function |
| [ids] | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> | A list of resource ids |

**Throws**:

- <code>TypeError</code> Invalid region provided
- <code>TypeError</code> Invalid baseURL provided
- <code>TypeError</code> Invalid appId provided
- <code>TypeError</code> Invalid appKey provided
- <code>TypeError</code> Invalid request provided

<a name="LGI.Guide..RequestBuilder#fields"></a>
#####requestBuilder.fields(...values) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Adds the provided fields to the list of fields to fetch.
Returns itself for chaining.

| Param | Type | Description |
| --- | --- | --- |
| ...values | <code>Field</code> \| <code>string</code> | List of fields |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Itself
<a name="LGI.Guide..RequestBuilder#filter"></a>
#####requestBuilder.filter(...values) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Adds the provided filter expressions to the list of filters to apply
when fetching the resources.
Returns itself for chaining.

| Param | Type | Description |
| --- | --- | --- |
| ...values | <code>Field</code> \| <code>string</code> | List of filters |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Itself
<a name="LGI.Guide..RequestBuilder#sortBy"></a>
#####requestBuilder.sortBy(field, [order]) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Sets the sort field and order.
Returns itself for chaining.

| Param | Type | Description |
| --- | --- | --- |
| field | <code>Field</code> \| <code>string</code> | The field by which to sort |
| [order] | <code>string</code> | The sorting order - asc or desc |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Itself
<a name="LGI.Guide..RequestBuilder#skip"></a>
#####requestBuilder.skip(value) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Sets the offset of the results.
Returns itself for chaining.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The offset amount |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Itself
<a name="LGI.Guide..RequestBuilder#limit"></a>
#####requestBuilder.limit(value) ⇒ <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code>
Sets the maximum number of results.
Returns itself for chaining.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The maximum number of results |

**Returns**: <code>[RequestBuilder](#LGI.Guide..RequestBuilder)</code> - Itself
<a name="LGI.Guide..RequestBuilder#execute"></a>
#####requestBuilder.execute([onSuccess], [onError])
Sends the request immediately.

| Param | Type | Description |
| --- | --- | --- |
| [onSuccess] | <code>function</code> | The success callback |
| [onError] | <code>function</code> | The error callback |

**Throws**:

- <code>TypeError</code> Invalid onSuccess callback
- <code>TypeError</code> Invalid onError callback

<a name="LGI.Guide..RequestBuilder#toString"></a>
#####requestBuilder.toString() ⇒ <code>string</code>
Builds the URL for the request based on provided parameters.

**Returns**: <code>string</code> - The URL for the request
<a name="LGI.Guide..Field"></a>
####class: Guide~Field ⇐ <code>[Evaluable](#new_Evaluable_new)</code>
**Extends:** <code>[Evaluable](#new_Evaluable_new)</code>
**Access:** protected
<a name="new_LGI.Guide..Field_new"></a>
#####new Field(context, name)
Represents a field (property) of a resource.

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The owner context |
| name | <code>string</code> | The name of the field |

<a name="LGI.Guide..NumericField"></a>
####class: Guide~NumericField ⇐ <code>[Field](#LGI.Guide..Field)</code>
**Extends:** <code>[Field](#LGI.Guide..Field)</code>
**Access:** protected

* [class: ~NumericField](#LGI.Guide..NumericField) ⇐ <code>[Field](#LGI.Guide..Field)</code>
  * [new NumericField(context, name)](#new_LGI.Guide..NumericField_new)
  * _instance_
    * [.isLessThan(value)](#LGI.Guide..NumericField#isLessThan) ⇒ <code>[Expression](#new_Expression_new)</code>
    * [.isLessThanOrEqualTo(value)](#LGI.Guide..NumericField#isLessThanOrEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
    * [.isEqualTo(value)](#LGI.Guide..NumericField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
    * [.isGreaterThanOrEqualTo(value)](#LGI.Guide..NumericField#isGreaterThanOrEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>
    * [.isGreaterThan(value)](#LGI.Guide..NumericField#isGreaterThan) ⇒ <code>[Expression](#new_Expression_new)</code>

<a name="new_LGI.Guide..NumericField_new"></a>
#####new NumericField(context, name)
Represents a numeric field

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The owner context |
| name | <code>string</code> | The name of the field |

<a name="LGI.Guide..NumericField#isLessThan"></a>
#####numericField.isLessThan(value) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field<value` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison
<a name="LGI.Guide..NumericField#isLessThanOrEqualTo"></a>
#####numericField.isLessThanOrEqualTo(value) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field<=value` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison
<a name="LGI.Guide..NumericField#isEqualTo"></a>
#####numericField.isEqualTo(value) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field=value` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison
<a name="LGI.Guide..NumericField#isGreaterThanOrEqualTo"></a>
#####numericField.isGreaterThanOrEqualTo(value) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field>=value` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison
<a name="LGI.Guide..NumericField#isGreaterThan"></a>
#####numericField.isGreaterThan(value) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field>value` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison
<a name="LGI.Guide..TextField"></a>
####class: Guide~TextField ⇐ <code>[Field](#LGI.Guide..Field)</code>
**Extends:** <code>[Field](#LGI.Guide..Field)</code>
**Access:** protected

* [class: ~TextField](#LGI.Guide..TextField) ⇐ <code>[Field](#LGI.Guide..Field)</code>
  * [new TextField(context, name)](#new_LGI.Guide..TextField_new)
  * _instance_
    * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>

<a name="new_LGI.Guide..TextField_new"></a>
#####new TextField(context, name)
Represents a text field

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The owner context |
| name | <code>string</code> | The name of the field |

<a name="LGI.Guide..TextField#isEqualTo"></a>
#####textField.isEqualTo(value) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field=value` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison
<a name="LGI.Guide..FuzzyMatchField"></a>
####class: Guide~FuzzyMatchField ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
**Extends:** <code>[TextField](#LGI.Guide..TextField)</code>
**Access:** protected

* [class: ~FuzzyMatchField](#LGI.Guide..FuzzyMatchField) ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
  * [new FuzzyMatchField(context, name)](#new_LGI.Guide..FuzzyMatchField_new)
  * _instance_
    * [.matches(value)](#LGI.Guide..FuzzyMatchField#matches) ⇒ <code>[Expression](#new_Expression_new)</code>
  * _inherits_
    * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>

<a name="new_LGI.Guide..FuzzyMatchField_new"></a>
#####new FuzzyMatchField(context, name)
Represents a fuzzy-match field

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The owner context |
| name | <code>string</code> | The name of the field |

<a name="LGI.Guide..FuzzyMatchField#matches"></a>
#####fuzzyMatchField.matches(value) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field~value` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison
<a name="LGI.Guide..MultiValueField"></a>
####class: Guide~MultiValueField ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
**Extends:** <code>[TextField](#LGI.Guide..TextField)</code>
**Access:** protected

* [class: ~MultiValueField](#LGI.Guide..MultiValueField) ⇐ <code>[TextField](#LGI.Guide..TextField)</code>
  * [new MultiValueField(context, name)](#new_LGI.Guide..MultiValueField_new)
  * _instance_
    * [.isIn(...values)](#LGI.Guide..MultiValueField#isIn) ⇒ <code>[Expression](#new_Expression_new)</code>
  * _inherits_
    * [.isEqualTo(value)](#LGI.Guide..TextField#isEqualTo) ⇒ <code>[Expression](#new_Expression_new)</code>

<a name="new_LGI.Guide..MultiValueField_new"></a>
#####new MultiValueField(context, name)
Represents a multi-value field

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The owner context |
| name | <code>string</code> | The name of the field |

<a name="LGI.Guide..MultiValueField#isIn"></a>
#####multiValueField.isIn(...values) ⇒ <code>[Expression](#new_Expression_new)</code>
Creates and returns an expression that produces the
comparison `field=val1,val2,...,valN` when evaluated.

| Param | Type | Description |
| --- | --- | --- |
| ...values | <code>string</code> | The values to compare to |

**Returns**: <code>[Expression](#new_Expression_new)</code> - Expression of the comparison

