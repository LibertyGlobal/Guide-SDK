describe('AbstractField', function () {

    describe('toString()', function () {
        it('should return the name of the field', function () {
            var sut = new AbstractField('foobar');

            expect(sut.toString()).toEqual('foobar');
        });
    });

});