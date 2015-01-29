describe('Field', function () {
  it('should create a new Evaluable with specific settings', function () {
    var mockContext = {};
    var mockValue = 'foobar';

    spyOn(window, 'Evaluable');

    new Field(mockContext, mockValue);

    expect(window.Evaluable).toHaveBeenCalledWith(mockValue, mockContext, '.');
  });
});
