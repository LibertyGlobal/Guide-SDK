/* globals isObject, isNonEmptyString, normalizeVariadic, RequestBuilder, Broadcast, Video, Channel */

/**
 * @namespace
 * @memberOf LGI
 */
var Guide = {
  settings: {
    baseURL: 'http://test.appdev.io/kraken/v2/schedule/data',
    region: '',
    appId: '',
    appKey: ''
  },

  /**
   * Initializes the Guide for the given region.
   *
   * @param {object} settings The settings object
   * @param {string} settings.region Target region code
   * @param {string} settings.appId App id (used for authentication)
   * @param {string} settings.appKey App key (used for authentication)
   * @throws {TypeError} Invalid configuration object
   * @throws {TypeError} Invalid region code
   * @throws {TypeError} Invalid app id
   * @throws {TypeError} Invalid app key
   */
  initialize: function (settings) {
    'use strict';

    if (!isObject(settings)) {
      throw new TypeError('Invalid configuration object');
    }

    if (!isNonEmptyString(settings.region)) {
      throw new TypeError('Invalid region code');
    }

    if (!isNonEmptyString(settings.appId)) {
      throw new TypeError('Invalid app id');
    }

    if (!isNonEmptyString(settings.appKey)) {
      throw new TypeError('Invalid app key');
    }

    this.settings.region = settings.region;
    this.settings.appId = settings.appId;
    this.settings.appKey = settings.appKey;
  },

  /**
   * Takes zero or more ids of broadcasts and returns a
   * pre-configured instance of RequestBuilder for Broadcast resources.
   *
   * @param {...string} ids Zero or more broadcast ids
   * @returns {LGI.Guide~RequestBuilder} Instance of RequestBuilder for Broadcast resources
   */
  findBroadcasts: function (ids) {
    'use strict';

    ids = normalizeVariadic(arguments);

    return new RequestBuilder(Broadcast, this.settings.region, this.settings.baseURL,
        this.settings.appId, this.settings.appKey, Guide.request, ids);
  },

  /**
   * Takes zero or more ids of videos and returns a
   * pre-configured instance of RequestBuilder for Video resources.
   *
   * @param {...string} ids Zero or more video ids
   * @returns {LGI.Guide~RequestBuilder} Instance of RequestBuilder for Video resources
   */
  findVideos: function (ids) {
    'use strict';

    ids = normalizeVariadic(arguments);

    return new RequestBuilder(Video, this.settings.region, this.settings.baseURL,
        this.settings.appId, this.settings.appKey, Guide.request, ids);
  },

  /**
   * Takes zero or more ids (refs) of channels and returns a
   * pre-configured instance of RequestBuilder for Channel resources.
   *
   * @param {...string} ids Zero or more channel ids (refs)
   * @returns {LGI.Guide~RequestBuilder} Instance of RequestBuilder for Channel resources
   */
  findChannels: function (ids) {
    'use strict';

    ids = normalizeVariadic(arguments);

    return new RequestBuilder(Channel, this.settings.region, this.settings.baseURL,
        this.settings.appId, this.settings.appKey, Guide.request, ids);
  }
};

Guide.Broadcast = Broadcast;
Guide.Video = Video;
Guide.Channel = Channel;
