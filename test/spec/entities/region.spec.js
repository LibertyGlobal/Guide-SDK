describe('K.Region', function () {

    describe('create()', function () {
        it('should create an instance', function () {
            expect(K.Region.create()).toEqual(jasmine.any(EntityBase));
        });
    });

    describe('attributes', function () {
        describe('ID', function () {
            it('should represent "id" attribute', function () {
                expect(K.Region.ID).toEqual(jasmine.any(AbstractField));
                expect(K.Region.ID.toString()).toEqual('id');
            });
        });

        describe('NAME', function () {
            it('should represent "name" attribute', function () {
                expect(K.Region.NAME).toEqual(jasmine.any(AbstractField));
                expect(K.Region.NAME.toString()).toEqual('name');
            });
        });

        describe('CHANNEL_LINEUP_LINK', function () {
            it('should represent "channelLineupLink" attribute', function () {
                expect(K.Region.CHANNEL_LINEUP_LINK).toEqual(jasmine.any(AbstractField));
                expect(K.Region.CHANNEL_LINEUP_LINK.toString()).toEqual('channelLineupLink');
            });
        });

        describe('SELF_LINK', function () {
            it('should represent "selfLink" attribute', function () {
                expect(K.Region.SELF_LINK).toEqual(jasmine.any(AbstractField));
                expect(K.Region.SELF_LINK.toString()).toEqual('selfLink');
            });
        });

        describe('TOP_BROADCASTS_LINK', function () {
            it('should represent "topBroadcastsLink" attribute', function () {
                expect(K.Region.TOP_BROADCASTS_LINK).toEqual(jasmine.any(AbstractField));
                expect(K.Region.TOP_BROADCASTS_LINK.toString()).toEqual('topBroadcastsLink');
            });
        });

        describe('TOP_VIDEOS_LINK', function () {
            it('should represent "topVideosLink" attribute', function () {
                expect(K.Region.TOP_VIDEOS_LINK).toEqual(jasmine.any(AbstractField));
                expect(K.Region.TOP_VIDEOS_LINK.toString()).toEqual('topVideosLink');
            });
        });
    });

});
