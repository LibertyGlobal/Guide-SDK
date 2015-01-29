describe('Expression', function () {
  it('should create a new Evaluable with specific settings', function () {
    var mockField = new Field({}, 'foo');
    var mockOperation = '=';
    var mockValue = 'foobar';

    spyOn(window, 'Evaluable');

    new Expression(mockField, mockOperation, mockValue);

    expect(window.Evaluable).toHaveBeenCalledWith(mockValue, mockField, mockOperation);
  });
});
