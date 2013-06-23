sdk
===

JavaScript SDK for Kraken API

Usage example:

    kraken.config.region = 'NL';
    kraken.Broadcast.create()
    .limit(5)
    .fields(kraken.Broadcast.TITLE, kraken.Broadcast.SYNOPSIS)
    .findAll(onBroadcastsReceived);
