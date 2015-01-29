describe('Resource', function () {
  describe('#evaluate()', function () {
    it('should return the name', function () {
      var sut = new Resource('mock', 'mock-url');

      expect(sut.evaluate()).toEqual('mock');
    });
  });
});
