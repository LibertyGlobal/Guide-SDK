describe('Broadcast', function () {

  it('should be an instance of Resource', function () {
    expect(Broadcast).toEqual(jasmine.any(Resource));
  });

  describe('#evaluate()', function () {
    it('should return "broadcast"', function () {
      expect(Broadcast.evaluate()).toEqual('broadcast');
    });
  });

  describe('fields', function () {
    it('should have a field IMI', function () {
      expect(Broadcast.IMI).toEqual(jasmine.any(Field));
    });

    it('should have a numeric field START', function () {
      expect(Broadcast.START).toEqual(jasmine.any(NumericField));
    });

    it('should have a numeric field END', function () {
      expect(Broadcast.END).toEqual(jasmine.any(NumericField));
    });

    it('should have a field CHANNEL', function () {
      expect(Broadcast.CHANNEL).toEqual(jasmine.any(Field));
    });

    it('should have a numeric field BUZZ_PER_MINUTE', function () {
      expect(Broadcast.BUZZ_PER_MINUTE).toEqual(jasmine.any(NumericField));
    });

    it('should have a numeric field POPULARITY', function () {
      expect(Broadcast.POPULARITY).toEqual(jasmine.any(NumericField));
    });
  });

});
