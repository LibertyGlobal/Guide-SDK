describe('TextField', function(){
    var fieldName = 'newfield';

    it('should be defined', function () {
        expect(TextField).toBeDefined();
    });

    beforeEach(function () {
        this.sut = new TextField(fieldName);
    });

    describe('constructor()', function () {
        it('should instantiate an object of type TextField', function () {
            expect(new TextField).toEqual(jasmine.any(TextField));
        });

        it('Should inherit from AbstractField properly', function () {
            var fieldToTest = new TextField(fieldName);
            expect(fieldToTest._getStringForOperation).toBeDefined();
            expect(fieldToTest.toString()).toEqual(fieldName);
        });
    });

    describe('equalTo()', function(){
        it('should return expected value', function (){
            expect(this.sut.equalTo('1')).toEqual(fieldName + '=1');
        });
    });

    describe('isMatching()', function(){
        it('should return expected value', function (){
            expect(this.sut.isMatching('1')).toEqual(fieldName + '~1');
        });
    });
});