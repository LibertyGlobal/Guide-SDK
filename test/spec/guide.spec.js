describe('Guide', function () {
  it('should expose resources', function () {
    expect(Guide.Broadcast).toBeDefined();
    expect(Guide.Video).toBeDefined();
    expect(Guide.Channel).toBeDefined();
  });
  
  describe('initialize()', function () {
    describe('given an invalid configuration object', function () {
      it('should throw', function () {
        ['', null, true, false, 1, 0, 'foo'].map(function (value) {
          expect(function () {
            Guide.initialize(value);
          }).toThrowError('Invalid configuration object');
        });
      });
    });

    describe('given an invalid region code string', function () {
      it('should throw', function () {
        ['', null, void 0, true, false, 1, 0, Function].map(function (value) {
          expect(function () {
            var config = {
              region: value
            };

            Guide.initialize(config);
          }).toThrowError('Invalid region code');
        });
      });
    });

    describe('given an invalid app id', function () {
      it('should throw', function () {
        ['', null, void 0, true, false, 1, 0, Function].map(function (value) {
          expect(function () {
            var config = {
              region: 'NL',
              appId: value
            };

            Guide.initialize(config);
          }).toThrowError('Invalid app id');
        });
      });
    });

    describe('given an invalid app key', function () {
      it('should throw', function () {
        ['', null, void 0, true, false, 1, 0, Function].map(function (value) {
          expect(function () {
            var config = {
              region: 'NL',
              appId: 'mock',
              appKey: value
            };

            Guide.initialize(config);
          }).toThrowError('Invalid app key');
        });
      });
    });
  });

  describe('findBroadcasts()', function () {
    beforeEach(function () {
      Guide.initialize({
        region: 'mock-region',
        appId: 'mock-app-id',
        appKey: 'mock-app-key'
      });

      Guide.request = jasmine.createSpy();

      spyOn(window, 'RequestBuilder');
    });

    it('should create an instance of RequestBuilder passing the ids', function () {
      var actual = Guide.findBroadcasts(1, 2, 3);

      expect(actual).toEqual(jasmine.any(RequestBuilder));
      expect(RequestBuilder).toHaveBeenCalledWith(Broadcast,
          'mock-region', jasmine.any(String), 'mock-app-id', 'mock-app-key', Guide.request, [1, 2, 3]);
    });
  });

  describe('findVideos()', function () {
    beforeEach(function () {
      Guide.initialize({
        region: 'mock-region',
        appId: 'mock-app-id',
        appKey: 'mock-app-key'
      });

      Guide.request = jasmine.createSpy();

      spyOn(window, 'RequestBuilder');
    });

    it('should create an instance of RequestBuilder passing the ids', function () {
      var actual = Guide.findVideos(1, 2, 3);

      expect(actual).toEqual(jasmine.any(RequestBuilder));
      expect(RequestBuilder).toHaveBeenCalledWith(Video,
          'mock-region', jasmine.any(String), 'mock-app-id', 'mock-app-key', Guide.request, [1, 2, 3]);
    });
  });

  describe('findChannels()', function () {
    beforeEach(function () {
      Guide.initialize({
        region: 'mock-region',
        appId: 'mock-app-id',
        appKey: 'mock-app-key'
      });

      Guide.request = jasmine.createSpy();

      spyOn(window, 'RequestBuilder');
    });

    it('should create an instance of RequestBuilder passing the ids', function () {
      var actual = Guide.findChannels('a1', 'b2', 'c3');

      expect(actual).toEqual(jasmine.any(RequestBuilder));
      expect(RequestBuilder).toHaveBeenCalledWith(Channel,
          'mock-region', jasmine.any(String), 'mock-app-id', 'mock-app-key', Guide.request, ['a1', 'b2', 'c3']);
    });
  });
});

