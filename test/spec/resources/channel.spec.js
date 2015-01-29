describe('Channel', function () {

  it('should be an instance of Resource', function () {
    expect(Channel).toEqual(jasmine.any(Resource));
  });

  describe('#evaluate()', function () {
    it('should return "channel"', function () {
      expect(Channel.evaluate()).toEqual('channel');
    });
  });

  describe('fields', function () {
    it('should have a multi-value field REF', function () {
      expect(Channel.REF).toEqual(jasmine.any(MultiValueField));
    });

    it('should have a fuzzy-match field NAME', function () {
      expect(Channel.NAME).toEqual(jasmine.any(FuzzyMatchField));
    });

    it('should have a numeric field POSITION', function () {
      expect(Channel.POSITION).toEqual(jasmine.any(NumericField));
    });

    it('should have a field LOGO_LINK', function () {
      expect(Channel.LOGO_LINK).toEqual(jasmine.any(Field));
    });

    it('should have a field OPENGRAPH_LINK', function () {
      expect(Channel.OPENGRAPH_LINK).toEqual(jasmine.any(Field));
    });
  });

});
