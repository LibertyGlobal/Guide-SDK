describe('LGI.Guide.Broadcast', function () {

    describe('create()', function () {
        it('should create an instance', function () {
            expect(LGI.Guide.Broadcast.create()).toEqual(jasmine.any(EntityBase));
        });
    });

    describe('attributes', function () {
        describe('ID', function () {
            it('should represent "id" attribute', function () {
                expect(LGI.Guide.Broadcast.ID).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Broadcast.ID.toString()).toEqual('id');
            });
        });

        describe('TITLE', function () {
            it('should represent "title" attribute', function () {
                expect(LGI.Guide.Broadcast.TITLE).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Broadcast.TITLE.toString()).toEqual('video.title');
            });
        });

        describe('CATEGORY', function () {
            it('should represent "category" attribute', function () {
                expect(LGI.Guide.Broadcast.CATEGORY).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Broadcast.CATEGORY.toString()).toEqual('video.category');
            });
        });

        describe('SYNOPSIS', function () {
            it('should represent "synopsis" attribute', function () {
                expect(LGI.Guide.Broadcast.SYNOPSIS).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Broadcast.SYNOPSIS.toString()).toEqual('video.synopsis');
            });
        });

        describe('START', function () {
            it('should represent "start" attribute', function () {
                expect(LGI.Guide.Broadcast.START).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Broadcast.START.toString()).toEqual('start');
            });
        });

        describe('END', function () {
            it('should represent "end" attribute', function () {
                expect(LGI.Guide.Broadcast.END).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Broadcast.END.toString()).toEqual('end');
            });
        });

        describe('VIDEO_ID', function () {
            it('should represent "videoId" attribute', function () {
                expect(LGI.Guide.Broadcast.VIDEO_ID).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Broadcast.VIDEO_ID.toString()).toEqual('video.id');
            });
        });
    });

});
