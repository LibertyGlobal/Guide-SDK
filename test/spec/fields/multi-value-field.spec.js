describe('MultiValueField', function () {
  it('should inherit methods from TextField', function () {
    var sut = new MultiValueField({}, 'foo');

    expect(sut.isEqualTo).toEqual(jasmine.any(Function));
  });

  describe('#isIn()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new MultiValueField({}, 'foo');
      var actual = sut.isIn('bar', 'baz', 'qux');

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo=bar,baz,qux');
    });
  });
});
