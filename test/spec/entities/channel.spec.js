describe('LGI.Guide.Channel', function () {

    describe('create()', function () {
        it('should create an instance', function () {
            expect(LGI.Guide.Channel.create()).toEqual(jasmine.any(EntityBase));
        });
    });

    describe('CHANNEL_REF', function () {
        it('should represent "ref" attribute', function () {
            expect(LGI.Guide.Channel.REF).toEqual(jasmine.any(AbstractField));
            expect(LGI.Guide.Channel.REF.toString()).toEqual('ref');
        });
    });

    describe('NAME', function () {
        it('should represent "name" attribute', function () {
            expect(LGI.Guide.Channel.NAME).toEqual(jasmine.any(AbstractField));
            expect(LGI.Guide.Channel.NAME.toString()).toEqual('name');
        });
    });

    describe('LOGICAL_POSITION', function () {
        it('should represent "logicalPosition" attribute', function () {
            expect(LGI.Guide.Channel.LOGICAL_POSITION).toEqual(jasmine.any(AbstractField));
            expect(LGI.Guide.Channel.LOGICAL_POSITION.toString()).toEqual('logicalPosition');
        });
    });

    describe('SELF_LINK', function () {
        it('should represent "selfLink" attribute', function () {
            expect(LGI.Guide.Channel.SELF_LINK).toEqual(jasmine.any(AbstractField));
            expect(LGI.Guide.Channel.SELF_LINK.toString()).toEqual('selfLink');
        });
    });

    describe('BROADCASTS_LINK', function () {
        it('should represent "broadcastsLink" attribute', function () {
            expect(LGI.Guide.Channel.BROADCASTS_LINK).toEqual(jasmine.any(AbstractField));
            expect(LGI.Guide.Channel.BROADCASTS_LINK.toString()).toEqual('broadcastsLink');
        });
    });

    describe('OPENGRAPH_LINK', function () {
        it('should represent "opengraphLink" attribute', function () {
            expect(LGI.Guide.Channel.OPENGRAPH_LINK).toEqual(jasmine.any(AbstractField));
            expect(LGI.Guide.Channel.OPENGRAPH_LINK.toString()).toEqual('opengraphLink');
        });
    });

});
