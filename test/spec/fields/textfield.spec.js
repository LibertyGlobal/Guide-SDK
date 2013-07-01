describe('TextField', function () {

    beforeEach(function () {
        this.sut = new TextField('foo');
    });

    describe('equalTo()', function () {
        it('should return an expression with the "=" sign', function () {
            expect(this.sut.equalTo('bar')).toEqual('foo=bar');
        });
    });

    describe('isMatching()', function () {
        it('should return an expression with the "~" sign', function () {
            expect(this.sut.isMatching(/FOO/i)).toEqual('foo~/FOO/i');
        });
    });

});