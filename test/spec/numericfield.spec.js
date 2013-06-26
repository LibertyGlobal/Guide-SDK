describe('NumericField', function(){
    var fieldName = 'newfield';

    it('should be defined', function () {
        expect(NumericField).toBeDefined();
    });

    beforeEach(function () {
        this.sut = new NumericField(fieldName);
    });

    describe('constructor()', function () {
        it('should instantiate an object of type NumericField', function () {
            expect(new NumericField).toEqual(jasmine.any(NumericField));
        });

        it('Should inherit from AbstractField properly', function () {
            var fieldToTest = new NumericField(fieldName);
            expect(fieldToTest._getStringForOperation).toBeDefined() && expect(fieldToTest.toString()).toEqual(fieldName);
        });
    });

    describe('equalTo()', function(){
        it('should return expected value', function (){
            expect(this.sut.equalTo('1')).toEqual(fieldName + '=1');
        });
    });

    describe('greaterThan()', function(){
        it('should return expected value', function (){
            expect(this.sut.greaterThan('1')).toEqual(fieldName + '>1');
        });
    });

    describe('greaterThanOrEqualTo()', function(){
        it('should return expected value', function (){
            expect(this.sut.greaterThanOrEqualTo('1')).toEqual(fieldName + '>=1');
        });
    });

    describe('lessThan()', function(){
        it('should return expected value', function (){
            expect(this.sut.lessThan('1')).toEqual(fieldName + '<1');
        });
    });

    describe('lessThanOrEqualTo()', function(){
        it('should return expected value', function (){
            expect(this.sut.lessThanOrEqualTo('1')).toEqual(fieldName + '<=1');
        });
    });
});