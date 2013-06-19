JavaScript SDK for Kraken API Draft 1
===

An example is worth a thousand words:

```javascript
	SDK.Channel.all()
		.filter(SDK.Channel.REGION_ID.equalTo('NL'))
        .expose(SDK.Channel.ID, SDK.Channel.NAME, SDK.Channel.BROADCASTS_LINK)
        .sortBy(SDK.Channel.NAME);
```

Please have a look at the source code of _index.html_ for more examples.

### Development

In order to build, get the latest [Node.js  and NPM](http://nodejs.org) and run:

1. `sudo npm install -g grunt-cli` to install Grunt-CLI (globally)
2. `npm install` inside the root directory to install dev Grunt plugins.