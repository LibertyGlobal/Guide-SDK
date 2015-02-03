describe('Evaluable', function () {
  describe('Evaluable.from()', function () {
    describe('when the argument is an instance of Evaluable', function () {
      it('should return the value unchanged', function () {
        var mock = new Evaluable();
        var actual = Evaluable.from(mock);

        expect(actual).toBe(mock);
      });
    });

    describe('when the argument is not an instance of Evaluable', function () {
      it('should wrap the value into an Evaluable and return it', function () {
        var mock = 'foobar';
        var actual = Evaluable.from(mock);

        expect(actual).toEqual(jasmine.any(Evaluable));
        expect(actual.evaluate()).toEqual('foobar');
      });
    });
  });

  describe('#toString()', function () {
    it('should delegate to #evaluate() with null context', function () {
      var context = {
        evaluate: function () {
          return 'context';
        }
      };
      var sut = new Evaluable('foo', context);

      spyOn(sut, 'evaluate').and.returnValue('foobar');

      expect(sut.toString()).toEqual('foobar');
      expect(sut.evaluate).toHaveBeenCalledWith(null);
    });
  });

  describe('#evaluate()', function () {
    describe('provided there is a context passed when initializing', function () {
      describe('when the context argument is the same', function () {
        it('should return only the value', function () {
          var context = {
            evaluate: function () {
              return 'context';
            }
          };
          var sut = new Evaluable('foo', context);
          var expected = 'foo';
          var actual = sut.evaluate(context);

          expect(actual).toEqual(expected);
        });
      });

      describe('when the context argument is absent', function () {
        it('should return the evaluated context and the value separated by the provided separator string', function () {
          var originalContext = {
            evaluate: function () {
              return 'originalContext';
            }
          };
          var sut = new Evaluable('bar', originalContext, '.');
          var expected = 'originalContext.bar';
          var actual = sut.evaluate();

          expect(actual).toEqual(expected);
        });
      });

      describe('when the context argument is different', function () {
        it('should return the evaluated context and the value separated by the provided separator string', function () {
          var originalContext = {
            evaluate: function () {
              return 'originalContext';
            }
          };
          var evaluationContext = {
            evaluate: function () {
              return 'passedContext';
            }
          };
          var sut = new Evaluable('bar', originalContext, '.');
          var expected = 'originalContext.bar';
          var actual = sut.evaluate(evaluationContext);

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('provided there is no context passed when initializing', function () {
      it('should return only the value', function () {
        var sut = new Evaluable('foo', null, '/');
        var expected = 'foo';
        var actual = sut.evaluate();

        expect(actual).toEqual(expected);
      });
    });

    describe('provided the original context does not have the method "evaluate"', function () {
      it('should return only the value', function () {
        var context = {};
        var sut = new Evaluable('foo', context, ':');
        var expected = 'foo';
        var actual = sut.evaluate(context);

        expect(actual).toEqual(expected);
      });
    });
  });
});
