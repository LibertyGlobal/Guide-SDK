describe('EntityBase', function () {

    it('should be defined', function () {
        expect(EntityBase).toBeDefined();
    });

    describe('constructor()', function () {
        it('should instantiate an object of type EntityBase', function () {
            expect(new EntityBase).toEqual(jasmine.any(EntityBase));
        });
    });

    describe('limit()', function () {
        beforeEach(function () {
            this.requestExecutionSpy = spyOn(Request.prototype, 'execute');
            this.sut = new EntityBase();
        });

        it('should return the object itself', function () {
            expect(this.sut.limit(1)).toBe(this.sut);
        });

        it('should add the "limit" parameter to the query string', function () {
            this.sut.limit(10);
            this.sut.findOne();

            expect(this.requestExecutionSpy).toHaveBeenCalled();
            expect(this.requestExecutionSpy.calls[0].args[0]).toMatch(/limit=10/);
        });
    });

    describe('fields()', function () {
        beforeEach(function () {
            this.requestExecutionSpy = spyOn(Request.prototype, 'execute');
            this.sut = new EntityBase();
        });

        it('should return the object itself', function () {
            expect(this.sut.fields('foo')).toBe(this.sut);
        });

        it('should add the "fields" parameter with comma-separated values to the query string', function () {
            this.sut.fields('foo', 'bar', 'baz.qux');
            this.sut.findOne();

            expect(this.requestExecutionSpy).toHaveBeenCalled();
            expect(this.requestExecutionSpy.calls[0].args[0]).toMatch(/fields=foo,bar,baz\.qux/);
        });
    });

    describe('sort()', function () {
        beforeEach(function () {
            this.requestExecutionSpy = spyOn(Request.prototype, 'execute');
            this.sut = new EntityBase();
        });

        describe('when the order argument is "asc"', function () {
            it('should add the "sort" parameter with ascending order', function () {
                this.sut.sort('foo', 'asc');
                this.sut.findOne();

                expect(this.requestExecutionSpy).toHaveBeenCalled();
                expect(this.requestExecutionSpy.calls[0].args[0]).toMatch(/sort=foo\(asc\)/);
            });
        });

        describe('when the order argument is "desc"', function () {
            it('should add the "sort" parameter with ascending order', function () {
                this.sut.sort('foo', 'desc');
                this.sut.findOne();

                expect(this.requestExecutionSpy).toHaveBeenCalled();
                expect(this.requestExecutionSpy.calls[0].args[0]).toMatch(/sort=foo\(desc\)/);
            });
        });

        describe('when the order argument undefined', function () {
            it('should add the "sort" parameter with ascending order by default', function () {
                this.sut.sort('foo');
                this.sut.findOne();

                expect(this.requestExecutionSpy).toHaveBeenCalled();
                expect(this.requestExecutionSpy.calls[0].args[0]).toMatch(/sort=foo\(asc\)/);
            });
        });

        describe('when the order argument is neither "asc", nor "desc", nor undefined', function () {
            it('should throw an error', function () {
                var sut = this.sut;

                expect(function () {
                    sut.sort('foo', 'bar');
                }).toThrow('Invalid sort option, expecting "asc" or "desc"');
            });
        });
    });

    describe('filter()', function () {
        beforeEach(function () {
            this.requestExecutionSpy = spyOn(Request.prototype, 'execute');
            this.sut = new EntityBase();
        });

        it('should return the object itself', function () {
            expect(this.sut.filter('foo')).toBe(this.sut);
        });

        it('should add the arguments as query string filter parameters', function () {
            this.sut.filter('foo=10', 'bar.baz>=20');
            this.sut.findOne();

            expect(this.requestExecutionSpy).toHaveBeenCalled();
            expect(this.requestExecutionSpy.calls[0].args[0]).toMatch(/foo=10/);
            expect(this.requestExecutionSpy.calls[0].args[0]).toMatch(/bar\.baz>=20/);
        });
    });

    describe('findOne()', function () {
        // TODO: real tests

        beforeEach(function () {
            this.requestExecutionSpy = spyOn(Request.prototype, 'execute');
            this.sut = new EntityBase();
        });

        it('should invoke Request#execute() with the URL, callback, and limit arguments', function () {
            this.sut.findOne();

            expect(this.requestExecutionSpy).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Function), 1);
        });
    });

    describe('findNext()', function () {
        // TODO: real tests

        beforeEach(function () {
            this.requestExecutionSpy = spyOn(Request.prototype, 'execute');
            this.sut = new EntityBase();
        });

        describe('when fetching for the first time', function () {
            it('should invoke Request#execute() with the URL, callback, and the limit arguments', function () {
                this.sut.findNext();

                expect(this.requestExecutionSpy).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Function), 1);
            });
        });

        describe('when fetching for the first time', function () {
            beforeEach(function () {
                this.sut._request.nextBatchLink = 'foo';
            });

            it('should invoke Request#execute() with the "nextBatchLink" URL from previous response, callback, and the limit arguments', function () {
                this.sut.findNext();

                expect(this.requestExecutionSpy).toHaveBeenCalledWith('foo', jasmine.any(Function), 1);
            });
        });
    });

    describe('findAll()', function () {
        // TODO: real tests

        beforeEach(function () {
            this.requestExecutionSpy = spyOn(Request.prototype, 'execute');
            this.sut = new EntityBase();
        });

        it('should invoke Request#execute() with the URL and a callback', function () {
            this.sut.findAll();

            expect(this.requestExecutionSpy).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Function));
        });
    });
});
