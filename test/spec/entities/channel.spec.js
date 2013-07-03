describe('K.Channel', function () {

    describe('create()', function () {
        it('should create an instance', function () {
            expect(K.Channel.create()).toEqual(jasmine.any(EntityBase));
        });
    });

    describe('CHANNEL_ID', function () {
        it('should represent "channelId" attribute', function () {
            expect(K.Channel.ID).toEqual(jasmine.any(AbstractField));
            expect(K.Channel.ID.toString()).toEqual('channelId');
        });
    });

    describe('NAME', function () {
        it('should represent "name" attribute', function () {
            expect(K.Channel.NAME).toEqual(jasmine.any(AbstractField));
            expect(K.Channel.NAME.toString()).toEqual('name');
        });
    });

    describe('LOGICAL_POSITION', function () {
        it('should represent "logicalPosition" attribute', function () {
            expect(K.Channel.LOGICAL_POSITION).toEqual(jasmine.any(AbstractField));
            expect(K.Channel.LOGICAL_POSITION.toString()).toEqual('logicalPosition');
        });
    });

    describe('SELF_LINK', function () {
        it('should represent "selfLink" attribute', function () {
            expect(K.Channel.SELF_LINK).toEqual(jasmine.any(AbstractField));
            expect(K.Channel.SELF_LINK.toString()).toEqual('selfLink');
        });
    });

    describe('BROADCASTS_LINK', function () {
        it('should represent "broadcastsLink" attribute', function () {
            expect(K.Channel.BROADCASTS_LINK).toEqual(jasmine.any(AbstractField));
            expect(K.Channel.BROADCASTS_LINK.toString()).toEqual('broadcastsLink');
        });
    });

    describe('OPENGRAPH_LINK', function () {
        it('should represent "opengraphLink" attribute', function () {
            expect(K.Channel.OPENGRAPH_LINK).toEqual(jasmine.any(AbstractField));
            expect(K.Channel.OPENGRAPH_LINK.toString()).toEqual('opengraphLink');
        });
    });

});
