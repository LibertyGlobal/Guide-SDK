describe('Video', function () {

  it('should be an instance of Resource', function () {
    expect(Video).toEqual(jasmine.any(Resource));
  });

  describe('#evaluate()', function () {
    it('should return "video"', function () {
      expect(Video.evaluate()).toEqual('video');
    });
  });

  describe('fields', function () {
    it('should have a field CRID', function () {
      expect(Video.CRID).toEqual(jasmine.any(Field));
    });

    it('should have a fuzzy-match field TITLE', function () {
      expect(Video.TITLE).toEqual(jasmine.any(FuzzyMatchField));
    });

    it('should have a field SHORT_SYNOPSIS', function () {
      expect(Video.SHORT_SYNOPSIS).toEqual(jasmine.any(Field));
    });

    it('should have a field SYNOPSIS', function () {
      expect(Video.SYNOPSIS).toEqual(jasmine.any(Field));
    });

    it('should have a fuzzy-match field CATEGORY', function () {
      expect(Video.CATEGORY).toEqual(jasmine.any(FuzzyMatchField));
    });

    it('should have a numeric field SEASON', function () {
      expect(Video.SEASON).toEqual(jasmine.any(NumericField));
    });

    it('should have a numeric field EPISODE', function () {
      expect(Video.EPISODE).toEqual(jasmine.any(NumericField));
    });

    it('should have a field STATISTICS', function () {
      expect(Video.STATISTICS).toEqual(jasmine.any(Field));
    });

    it('should have a text field AGE_RATING', function () {
      expect(Video.AGE_RATING).toEqual(jasmine.any(TextField));
    });

    it('should have a text field CAST', function () {
      expect(Video.CAST).toEqual(jasmine.any(Field));
    });

    it('should have a text field DIRECTORS', function () {
      expect(Video.DIRECTORS).toEqual(jasmine.any(Field));
    });

    it('should have a text field WRITERS', function () {
      expect(Video.WRITERS).toEqual(jasmine.any(Field));
    });

    it('should have a field IMAGE_LINK', function () {
      expect(Video.IMAGE_LINK).toEqual(jasmine.any(Field));
    });

    it('should have a field OPENGRAPH_LINK', function () {
      expect(Video.OPENGRAPH_LINK).toEqual(jasmine.any(Field));
    });

    it('should have a field RECORD_LINK', function () {
      expect(Video.RECORD_LINK).toEqual(jasmine.any(Field));
    });
  });

});
