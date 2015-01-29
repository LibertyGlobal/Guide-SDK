describe('TextField', function () {
  describe('#isEqualTo()', function () {
    it('should return an expression that encapsulates the operation', function () {
      var sut = new TextField({}, 'foo');
      var actual = sut.isEqualTo('bar');

      expect(actual).toEqual(jasmine.any(Expression));
      expect(actual.evaluate()).toEqual('foo=bar');
    });
  });
});
