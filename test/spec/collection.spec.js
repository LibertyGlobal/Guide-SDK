describe('kraken.Collection', function () {

    describe('constructor()', function () {
        it('should instantiate the collection', function () {
            expect(new kraken.Collection).toEqual(jasmine.any(kraken.Collection));
        });

        it('should store the passed arguments as items', function () {
            var sut = new kraken.Collection([ 'foo', 'bar' ]);

            expect(sut.toArray()).toEqual([ 'foo', 'bar' ]);
        });
    });

    describe('each()', function () {
        describe('when there are no items', function () {
            beforeEach(function () {
                this.sut = new kraken.Collection();
                this.spy = this.spy = jasmine.createSpy('callback');
            });

            it('should not invoke the iterator function', function () {
                this.sut.each(this.spy);

                expect(this.spy).not.toHaveBeenCalled();
            });
        });

        describe('when there is one or more items', function () {
            beforeEach(function () {
                this.sut = new kraken.Collection([ 'foo', 'bar' ]);
                this.spy = this.spy = jasmine.createSpy('callback');
            });

            it('should call the function with each item as the first argument', function () {
                this.sut.each(this.spy);

                expect(this.spy.callCount).toEqual(2);
                expect(this.spy.calls[0].args[0]).toEqual('foo');
                expect(this.spy.calls[1].args[0]).toEqual('bar');
            });
        });
    });

    describe('where()', function () {
        beforeEach(function () {
            this.sut = new kraken.Collection([
                { id: 1, foo: 100, bar: 200 },
                { id: 2, foo: 100, bar: 200 },
                { id: 3, foo: 200, bar: 200 },
                { id: 4, foo: 500, bar: 600 }
            ]);
        });

        describe('when there are items matching the constraints', function () {
            it('should return the matching items as an array', function () {
                var expected = [
                    { id: 1, foo: 100, bar: 200 },
                    { id: 2, foo: 100, bar: 200 }
                ];
                var actual = this.sut.where({ foo: 100, bar: 200 });

                expect(actual).toEqual(expected);
            });
        });

        describe('when there are no matching items', function () {
            it('should return an empty array', function () {
                expect(this.sut.where({ foo: 300, bar: 200 }).length).toEqual(0);
            });
        });
    });

    describe('add()', function () {
        beforeEach(function () {
            this.sut = new kraken.Collection([ 'foo', 'bar' ]);
        });

        describe('when the item is an array', function () {
            it('should concatenate the array to existing items', function () {
                var mockObject = [ 'baz' ];

                this.sut.add(mockObject);

                expect(this.sut.toArray()).toEqual([ 'foo', 'bar', 'baz' ]);
            });
        });

        describe('when the item is not an array', function () {
            it('should push the item onto the array of items', function () {
                this.sut.add('baz');

                expect(this.sut.toArray().length).toEqual(3);
            });
        });
    });

    describe('get()', function () {
        beforeEach(function () {
            this.sut = new kraken.Collection([ 'foo', 'bar' ]);
        });

        describe('when the item at given index is available', function () {
            it('should return the item at given index', function () {
                expect(this.sut.get(1)).toEqual('bar');
            });
        });

        describe('when the index is invalid', function () {
            it('should return undefined', function () {
                expect(this.sut.get(10)).toBeUndefined();
            });
        });
    });

    describe('toArray()', function () {
        beforeEach(function () {
            this.sut = new kraken.Collection([ 'foo', 'bar' ]);
        });

        it('should return all items as an array', function () {
            this.sut.items = [ 'foo', 'bar' ];

            expect(this.sut.toArray()).toEqual([ 'foo', 'bar' ]);
        });

        it('should return a copy of the original array', function () {
            this.sut.items = [ 'foo' ];

            var actual = this.sut.toArray();

            this.sut.items.push('bar');

            expect(actual.length).toEqual(1);
        });
    });

});