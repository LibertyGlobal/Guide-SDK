describe('NumericField', function () {
  describe('#isLessThan()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new NumericField({}, 'foo');
      var actual = sut.isLessThan(1);

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo<1');
    });
  });

  describe('#isLessThanOrEqualTo()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new NumericField({}, 'foo');
      var actual = sut.isLessThanOrEqualTo(1);

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo<=1');
    });
  });

  describe('#isEqualTo()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new NumericField({}, 'foo');
      var actual = sut.isEqualTo(1);

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo=1');
    });
  });

  describe('#isGreaterThanOrEqualTo()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new NumericField({}, 'foo');
      var actual = sut.isGreaterThanOrEqualTo(1);

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo>=1');
    });
  });

  describe('#isGreaterThan()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new NumericField({}, 'foo');
      var actual = sut.isGreaterThan(1);

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo>1');
    });
  });
});
