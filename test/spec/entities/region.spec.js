describe('LGI.Guide.Region', function () {

    describe('create()', function () {
        it('should create an instance', function () {
            expect(LGI.Guide.Region.create()).toEqual(jasmine.any(EntityBase));
        });
    });

    describe('attributes', function () {
        describe('ID', function () {
            it('should represent "id" attribute', function () {
                expect(LGI.Guide.Region.ID).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Region.ID.toString()).toEqual('id');
            });
        });

        describe('NAME', function () {
            it('should represent "name" attribute', function () {
                expect(LGI.Guide.Region.NAME).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Region.NAME.toString()).toEqual('name');
            });
        });

        describe('CHANNEL_LINEUP_LINK', function () {
            it('should represent "channelLineupLink" attribute', function () {
                expect(LGI.Guide.Region.CHANNEL_LINEUP_LINK).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Region.CHANNEL_LINEUP_LINK.toString()).toEqual('channelLineupLink');
            });
        });

        describe('SELF_LINK', function () {
            it('should represent "selfLink" attribute', function () {
                expect(LGI.Guide.Region.SELF_LINK).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Region.SELF_LINK.toString()).toEqual('selfLink');
            });
        });

        describe('TOP_BROADCASTS_LINK', function () {
            it('should represent "topBroadcastsLink" attribute', function () {
                expect(LGI.Guide.Region.TOP_BROADCASTS_LINK).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Region.TOP_BROADCASTS_LINK.toString()).toEqual('topBroadcastsLink');
            });
        });

        describe('TOP_VIDEOS_LINK', function () {
            it('should represent "topVideosLink" attribute', function () {
                expect(LGI.Guide.Region.TOP_VIDEOS_LINK).toEqual(jasmine.any(AbstractField));
                expect(LGI.Guide.Region.TOP_VIDEOS_LINK.toString()).toEqual('topVideosLink');
            });
        });
    });

});
