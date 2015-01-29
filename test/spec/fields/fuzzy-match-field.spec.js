describe('FuzzyMatchField', function () {
  it('should inherit methods from TextField', function () {
    var sut = new FuzzyMatchField({}, 'foo');

    expect(sut.isEqualTo).toEqual(jasmine.any(Function));
  });

  describe('#matches()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new FuzzyMatchField({}, 'foo');
      var actual = sut.matches('bar');

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo~bar');
    });
  });
});
