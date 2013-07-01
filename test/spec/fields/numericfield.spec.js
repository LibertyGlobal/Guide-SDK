describe('NumericField', function () {

    beforeEach(function () {
        this.sut = new NumericField('foo');
    });

    describe('equalTo()', function () {
        it('should return an expression with the "=" sign', function () {
            expect(this.sut.equalTo(100)).toEqual('foo=100');
        });
    });

    describe('greaterThan()', function () {
        it('should return an expression with the ">" sign', function () {
            expect(this.sut.greaterThan(100)).toEqual('foo>100');
        });
    });

    describe('greaterThanOrEqualTo()', function () {
        it('should return an expression with the ">=" sign', function () {
            expect(this.sut.greaterThanOrEqualTo(100)).toEqual('foo>=100');
        });
    });

    describe('lessThan()', function () {
        it('should return an expression with the "<" sign', function () {
            expect(this.sut.lessThan(100)).toEqual('foo<100');
        });
    });

    describe('lessThanOrEqualTo()', function () {
        it('should return an expression with the "<=" sign', function () {
            expect(this.sut.lessThanOrEqualTo(100)).toEqual('foo<=100');
        });
    });

});