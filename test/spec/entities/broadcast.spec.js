describe('K.Broadcast', function () {

    describe('create()', function () {
        it('should create an instance', function () {
            expect(K.Broadcast.create()).toEqual(jasmine.any(EntityBase));
        });
    });

    describe('attributes', function () {
        describe('ID', function () {
            it('should represent "id" attribute', function () {
                expect(K.Broadcast.ID).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.ID.toString()).toEqual('id');
            });
        });

        describe('TITLE', function () {
            it('should represent "title" attribute', function () {
                expect(K.Broadcast.TITLE).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.TITLE.toString()).toEqual('video.title');
            });
        });

        describe('CATEGORY', function () {
            it('should represent "category" attribute', function () {
                expect(K.Broadcast.CATEGORY).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.CATEGORY.toString()).toEqual('video.category');
            });
        });

        describe('SYNOPSIS', function () {
            it('should represent "synopsis" attribute', function () {
                expect(K.Broadcast.SYNOPSIS).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.SYNOPSIS.toString()).toEqual('video.synopsis');
            });
        });

        describe('START', function () {
            it('should represent "start" attribute', function () {
                expect(K.Broadcast.START).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.START.toString()).toEqual('start');
            });
        });

        describe('END', function () {
            it('should represent "end" attribute', function () {
                expect(K.Broadcast.END).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.END.toString()).toEqual('end');
            });
        });

        describe('VIDEO_ID', function () {
            it('should represent "videoId" attribute', function () {
                expect(K.Broadcast.VIDEO_ID).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.VIDEO_ID.toString()).toEqual('video.id');
            });
        });

        describe('OPENGRAPH_LINK', function () {
            it('should represent "opengraphLink" attribute', function () {
                expect(K.Broadcast.OPENGRAPH_LINK).toEqual(jasmine.any(AbstractField));
                expect(K.Broadcast.OPENGRAPH_LINK.toString()).toEqual('video.opengraphLink');
            });
        });
    });

});
