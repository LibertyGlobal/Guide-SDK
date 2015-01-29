describe('RequestBuilder', function () {

  function setUp() {
    this.mockContext = new Resource('mock', 'mock-endpoint');
    this.mockRegion = 'mock-region';
    this.mockBaseURL = 'http://example.com';
    this.mockAppId = 'mock-app-id';
    this.mockAppKey = 'mock-app-key';
    this.mockRequest = jasmine.createSpy();

    this.sut = new RequestBuilder(this.mockContext, this.mockRegion, this.mockBaseURL, this.mockAppId, this.mockAppKey, this.mockRequest, []);
  }

  describe('when region is invalid', function () {
    it('should throw', function () {
      var mockContext = new Resource('mock', 'mock-url');

      ['', null, void 0, true, false, 10, Function, [], {}].map(function (value) {
        expect(function () {
          new RequestBuilder(mockContext, value);
        }).toThrowError('Invalid region');
      });
    });
  });

  describe('when baseURL is invalid', function () {
    it('should throw', function () {
      var mockContext = new Resource('mock', 'mock-url');

      ['', null, void 0, true, false, 10, Function, [], {}].map(function (value) {
        expect(function () {
          new RequestBuilder(mockContext, 'mock-region', value);
        }).toThrowError('Invalid baseURL');
      });
    });
  });

  describe('when appId is invalid', function () {
    it('should throw', function () {
      var mockContext = new Resource('mock', 'mock-url');

      ['', null, void 0, true, false, 10, Function, [], {}].map(function (value) {
        expect(function () {
          new RequestBuilder(mockContext, 'mock-region', 'mock-url', value);
        }).toThrowError('Invalid appId');
      });
    });
  });

  describe('when appKey is invalid', function () {
    it('should throw', function () {
      var mockContext = new Resource('mock', 'mock-url');

      ['', null, void 0, true, false, 10, Function, [], {}].map(function (value) {
        expect(function () {
          new RequestBuilder(mockContext, 'mock-region', 'mock-url', 'mock-app-id', value);
        }).toThrowError('Invalid appKey');
      });
    });
  });

  describe('when request function is invalid', function () {
    it('should throw', function () {
      var mockContext = new Resource('mock', 'mock-url');

      ['', null, void 0, true, false, 10, 'foo', [], {}].map(function (value) {
        expect(function () {
          new RequestBuilder(mockContext, 'mock-region', 'mock-url', 'mock-app-id', 'mock-app-key', value);
        }).toThrowError('Invalid request function');
      });
    });
  });

  describe('#fields()', function () {
    beforeEach(setUp);

    it('should return itself', function () {
      expect(this.sut.fields()).toBe(this.sut);
    });

    it('should cast each value into an Evaluable', function () {
      spyOn(Evaluable, 'from');

      var values = [1, 2, 3];

      this.sut.fields(values);

      expect(Evaluable.from.calls.count()).toEqual(3);
    });

    it('should append fields on each invocation', function () {
      var batch1 = [1, 2, 3];
      var batch2 = [4, 5, 6];

      this.sut.fields(batch1);

      expect(this.sut.toString()).toMatch(/fields=1,2,3$/);

      this.sut.fields(batch2);

      expect(this.sut.toString()).toMatch(/fields=1,2,3,4,5,6$/);
    });
  });

  describe('#filter()', function () {
    beforeEach(setUp);

    it('should return itself', function () {
      expect(this.sut.filter()).toBe(this.sut);
    });

    it('should cast each value into an Evaluable', function () {
      spyOn(Evaluable, 'from');

      var values = [1, 2, 3];

      this.sut.filter(values);

      expect(Evaluable.from.calls.count()).toEqual(3);
    });

    it('should append filters on each invocation', function () {
      var batch1 = [1, 2, 3];
      var batch2 = [4, 5, 6];

      this.sut.filter(batch1);

      expect(this.sut.toString()).toMatch(/1&2&3$/);

      this.sut.filter(batch2);

      expect(this.sut.toString()).toMatch(/1&2&3&4&5&6$/);
    });
  });

  describe('#sortBy()', function () {
    beforeEach(setUp);

    it('should return itself', function () {
      expect(this.sut.sortBy()).toBe(this.sut);
    });

    describe('when the order argument is "asc"', function () {
      it('should be set to "asc"', function () {
        spyOn(window, 'Expression');

        var mockField = new Field(this.mockContext, 'foo');

        this.sut.sortBy(mockField, 'asc');

        expect(Expression).toHaveBeenCalledWith(mockField, '', '(asc)');
      });
    });

    describe('when the order argument is "desc"', function () {
      it('should be set to "asc"', function () {
        spyOn(window, 'Expression');

        var mockField = new Field(this.mockContext, 'foo');

        this.sut.sortBy(mockField, 'desc');

        expect(Expression).toHaveBeenCalledWith(mockField, '', '(desc)');
      });
    });

    describe('when the order argument is absent', function () {
      it('should be set to "asc"', function () {
        spyOn(window, 'Expression');

        var mockField = new Field(this.mockContext, 'foo');

        this.sut.sortBy(mockField);

        expect(Expression).toHaveBeenCalledWith(mockField, '', '(asc)');
      });
    });
  });

  describe('#skip()', function () {
    beforeEach(setUp);

    describe('when the argument is a positive number', function () {
      it('should be set to the value of the argument', function () {
        this.sut.skip(10);

        expect(this.sut.toString()).toContain('skip=10');
      });

      it('should override the previous value', function () {
        var sut = this.sut;

        [1, 5, 100, 20].map(function (value) {
          sut.skip(value);
          expect(sut.toString()).toContain('skip=' + value);
        });
      });
    });

    describe('when the argument is not a positive number', function () {
      it('should ignore the call', function () {
        var sut = this.sut;

        [-1, void 0, true, {}, Infinity].map(function (value) {
          sut.skip(value);
          expect(sut.toString()).not.toContain('skip=');
        });
      });

      it('should not override the previous valid value', function () {
        var sut = this.sut;

        sut.skip(10);

        [-1, void 0, true, {}, Infinity].map(function (value) {
          sut.skip(value);
          expect(sut.toString()).toContain('skip=10');
        });
      });
    });
  });

  describe('#limit()', function () {
    beforeEach(setUp);

    describe('when the argument is a positive number', function () {
      it('should be set to the value of the argument', function () {
        this.sut.limit(10);

        expect(this.sut.toString()).toContain('limit=10');
      });

      it('should override the previous value', function () {
        var sut = this.sut;

        [1, 5, 100, 20].map(function (value) {
          sut.limit(value);
          expect(sut.toString()).toContain('limit=' + value);
        });
      });
    });

    describe('when the argument is not a positive number', function () {
      it('should ignore the call', function () {
        var sut = this.sut;

        [-1, void 0, true, {}, Infinity].map(function (value) {
          sut.limit(value);
          expect(sut.toString()).not.toContain('limit=');
        });
      });

      it('should not override the previous valid value', function () {
        var sut = this.sut;

        sut.limit(10);

        [-1, void 0, true, {}, Infinity].map(function (value) {
          sut.limit(value);
          expect(sut.toString()).toContain('limit=10');
        });
      });
    });
  });

  describe('#toString()', function () {
    beforeEach(setUp);

    it('should return a string', function () {
      expect(this.sut.toString()).toEqual(jasmine.any(String));
    });

    describe('provided there are fields', function () {
      beforeEach(function () {
        this.mockContext2 = new Resource('mock2', 'mock-url-2');

        this.sut.fields([
          new Field(this.mockContext, 'foo'),
          new Field(this.mockContext, 'bar'),
          new Field(this.mockContext2, 'baz')
        ]);
      });

      it('should evaluate each field and build a named query-string parameter', function () {
        var expected = 'fields=foo,bar,mock2.baz';
        var actual = this.sut.toString();

        expect(actual).toContain(expected);
      });
    });

    describe('provided there are no fields', function () {
      it('should not add a named query-string parameter', function () {
        expect(this.sut.toString()).not.toContain('fields=');
      });
    });

    describe('provided there are filters', function () {
      beforeEach(function () {
        this.mockContext2 = new Resource('mock2', 'mock-url-2');

        this.mockField1 = new Field(this.mockContext, 'foo');
        this.mockField2 = new Field(this.mockContext2, 'bar');
        this.mockField3 = new Field(this.mockContext, 'baz');

        this.sut.filter([
          new Expression(this.mockField1, '=', 'foo'),
          new Expression(this.mockField2, '>', 'bar'),
          new Expression(this.mockField3, '<', 'baz')
        ]);
      });

      it('should evaluate each field and build a named query-string parameter', function () {
        var expected = ['foo=foo', 'mock2.bar>bar', 'baz<baz'];
        var actual = this.sut.toString();

        expect(actual).toContain(expected[0]);
        expect(actual).toContain(expected[1]);
        expect(actual).toContain(expected[2]);
      });
    });

    describe('provided there are no filters', function () {
      it('should not add a named query-string parameter', function () {
        expect(this.sut.toString()).not.toContain('foo=foo');
      });
    });

    describe('provided there is a sort expression', function () {
      beforeEach(function () {
        this.mockContext2 = new Resource('mock2', 'mock-url-2');

        this.mockField = new Field(this.mockContext, 'foo');
        this.sut.sortBy(this.mockField, 'desc');
      });

      it('should add a named query-string parameter', function () {
        var expected = 'sort=foo(desc)';
        var actual = this.sut.toString();

        expect(actual).toContain(expected);
      });
    });

    describe('provided there is no sort expression', function () {
      it('should not add a named query-string parameter', function () {
        expect(this.sut.toString()).not.toContain('sort=');
      });
    });

    describe('provided there is a skip parameter', function () {
      beforeEach(function () {
        this.sut.skip(10);
      });

      it('should add a named query-string parameter', function () {
        expect(this.sut.toString()).toContain('skip=10');
      });
    });

    describe('provided there is no skip parameter', function () {
      it('should not add a named query-string parameter', function () {
        expect(this.sut.toString()).not.toContain('skip=');
      });
    });

    describe('provided there is a limit parameter', function () {
      beforeEach(function () {
        this.sut.limit(10);
      });

      it('should add a named query-string parameter', function () {
        expect(this.sut.toString()).toContain('limit=10');
      });
    });

    describe('provided there is no limit parameter', function () {
      it('should not add a named query-string parameter', function () {
        expect(this.sut.toString()).not.toContain('limit=');
      });
    });

    describe('provided there are multiple parameters', function () {
      beforeEach(function () {
        this.mockContext2 = new Resource('mock2', 'mock-url-2');

        this.mockField1 = new Field(this.mockContext, 'foo');
        this.mockField2 = new Field(this.mockContext2, 'bar');
        this.mockField3 = new Field(this.mockContext, 'baz');
        this.mockExpression1 = new Expression(this.mockField1, '=', 'FOO');
        this.mockExpression2 = new Expression(this.mockField2, '=', 'BAR');
        this.mockExpression3 = new Expression(this.mockField3, '=', 'BAZ');
      });

      it('should build the correct array of parameters', function () {
        this.sut.fields([
          this.mockField1,
          this.mockField2,
          this.mockField3
        ]);
        this.sut.filter([
          this.mockExpression1,
          this.mockExpression2,
          this.mockExpression3
        ]);
        this.sut.sortBy(this.mockField1, 'desc');
        this.sut.skip(5);
        this.sut.limit(10);

        var expected = 'http://example.com/mock-region/mock-endpoint.json?' + [
              'fields=foo,mock2.bar,baz',
              'foo=FOO',
              'mock2.bar=BAR',
              'baz=BAZ',
              'sort=foo(desc)',
              'skip=5',
              'limit=10'
            ].join('&');

        var actual = this.sut.toString();

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('#execute()', function () {
    describe('given an onSuccess callback', function () {
      beforeEach(setUp);

      describe('when the callback is invalid', function () {
        it('should throw', function () {
          var sut = this.sut;

          ['', {}, [], true, false, 1].map(function (value) {
            expect(function () {
              sut.execute(value);
            }).toThrowError('Invalid onSuccess callback');
          });
        });
      });

      describe('when the callback is valid', function () {
        it('should not throw', function () {
          var sut = this.sut;

          expect(function () {
            sut.execute(function () {});
          }).not.toThrowError('Invalid onSuccess callback');
        });
      });
    });

    describe('given an onError callback', function () {
      beforeEach(setUp);

      describe('when the callback is invalid', function () {
        it('should throw', function () {
          var sut = this.sut;

          ['', {}, [], true, false, 1].map(function (value) {
            expect(function () {
              sut.execute(function() {}, value);
            }).toThrowError('Invalid onError callback');
          });
        });
      });

      describe('when the callback is valid', function () {
        it('should not throw', function () {
          var sut = this.sut;

          expect(function () {
            sut.execute(function () {}, function () {});
          }).not.toThrowError('Invalid onError callback');
        });
      });
    });

    it('should call the transport function', function () {
      var mockContext = new Resource('mock', 'mock-url');
      var mockRegion = 'mock-region';
      var mockBaseURL = 'http://example.com';
      var mockAppId = 'mock-app-id';
      var mockAppKey = 'mock-app-key';
      var mockTransport = jasmine.createSpy();

      var sut = new RequestBuilder(mockContext, mockRegion, mockBaseURL, mockAppId, mockAppKey, mockTransport, [1, 2]);

      sut.execute();

      expect(mockTransport).toHaveBeenCalledWith('http://example.com/mock-region/mock-url/1,2.json?',
          jasmine.any(Object), jasmine.any(Function), jasmine.any(Function));
    });
  });
});
