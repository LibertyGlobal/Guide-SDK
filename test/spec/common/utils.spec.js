describe('and()', function () {
  it('should return a function', function () {
    expect(and(isNaN, isFinite)).toEqual(jasmine.any(Function));
  });

  describe('the returned function', function () {
    var mock1;
    var mock2;
    var mock3;

    describe('when all predicates pass', function () {
      it('should return true', function () {
        mock1 = jasmine.createSpy().and.returnValue(true);
        mock2 = jasmine.createSpy().and.returnValue(true);

        var combined = and(mock1, mock2);

        expect(combined('foobar')).toBe(true);
        expect(mock1).toHaveBeenCalledWith('foobar');
        expect(mock2).toHaveBeenCalledWith('foobar');
      });
    });

    describe('when at least one predicate returns false', function () {
      beforeEach(function () {
        mock1 = jasmine.createSpy().and.returnValue(true);
        mock2 = jasmine.createSpy().and.returnValue(false);
        mock3 = jasmine.createSpy().and.returnValue(true);
      });

      it('should return false', function () {
        var combined = and(mock1, mock2, mock3);

        expect(combined('foobar')).toBe(false);
      });

      it('should exit early', function () {
        var combined = and(mock1, mock2, mock3);

        combined('foobar');

        expect(mock1).toHaveBeenCalledWith('foobar');
        expect(mock2).toHaveBeenCalledWith('foobar');
        expect(mock3).not.toHaveBeenCalled();
      });
    });
  });
});


describe('or()', function () {
  it('should return a function', function () {
    expect(or(isNaN, isFinite)).toEqual(jasmine.any(Function));
  });

  describe('the returned function', function () {
    var mock1;
    var mock2;
    var mock3;

    describe('when no predicates pass', function () {
      it('should return false', function () {
        mock1 = jasmine.createSpy().and.returnValue(false);
        mock2 = jasmine.createSpy().and.returnValue(false);
        mock3 = jasmine.createSpy().and.returnValue(false);

        var combined = or(mock1, mock2, mock3);

        expect(combined('foobar')).toBe(false);
        expect(mock1).toHaveBeenCalledWith('foobar');
        expect(mock2).toHaveBeenCalledWith('foobar');
        expect(mock3).toHaveBeenCalledWith('foobar');
      });
    });

    describe('when at least one predicate returns true', function () {
      beforeEach(function () {
        mock1 = jasmine.createSpy().and.returnValue(false);
        mock2 = jasmine.createSpy().and.returnValue(true);
        mock3 = jasmine.createSpy().and.returnValue(false);
      });

      it('should return true', function () {
        var combined = or(mock1, mock2, mock3);

        expect(combined('foobar')).toBe(true);
      });

      it('should exit early', function () {
        var combined = or(mock1, mock2, mock3);

        combined('foobar');

        expect(mock1).toHaveBeenCalledWith('foobar');
        expect(mock2).toHaveBeenCalledWith('foobar');
        expect(mock3).not.toHaveBeenCalled();
      });
    });
  });
});

describe('not()', function () {
  it('should return a function', function () {
    expect(not(isNaN)).toEqual(jasmine.any(Function));
  });

  describe('the returned function', function () {
    it('should negate the return value or the original function', function () {
      var mock = jasmine.createSpy().and.returnValue(true);

      expect(not(mock)()).toBe(false);
      expect(not(not(mock))()).toBe(true);
    });
  });
});

describe('exists()', function () {
  describe('given a defined, non-null value', function () {
    it('should return true', function () {
      [0, [], {}, '', false, 10, String()].forEach(function (value) {
        expect(exists(value)).toBe(true);
      });
    });
  });

  describe('given an undefined or null value', function () {
    it('should return false', function () {
      [void 0, null].forEach(function (value) {
        expect(exists(value)).toBe(false);
      });
    });
  });
});

describe('hasLength()', function () {
  describe('given a value with the length property equal to 0', function () {
    it('should return false', function () {
      [[], '', { length: 0 }].forEach(function (value) {
        expect(hasLength(value)).toBe(false);
      });
    });
  });

  describe('given a value with the length property greater than 0', function () {
    it('should return true', function () {
      [new Array(5), 'foo', { length: 1 }].forEach(function (value) {
        expect(hasLength(value)).toBe(true);
      });
    });
  });
});

describe('isNumeric()', function () {
  describe('given a numeric value', function () {
    it('should return true', function () {
      [0, parseInt('foo'), -.5e2].forEach(function (value) {
        expect(isNumeric(value)).toBe(true);
      });
    });
  });

  describe('given a non-numeric value', function () {
    it('should return false', function () {
      ['', parseInt, {}, true, false, void 0, null].forEach(function (value) {
        expect(isNumeric(value)).toBe(false);
      });
    });
  });
});

describe('isNumber()', function () {
  describe('given a valid finite number', function () {
    it('should return true', function () {
      [0, -1, 0.5e3, 0x5, parseInt('1')].forEach(function (value) {
        expect(isNumber(value)).toBe(true);
      });
    });
  });

  describe('given an invalid, infinite or boxed number', function () {
    it('should return false', function () {
      [NaN, '1', [], parseInt('a'), Infinity, -Infinity, new Number(5)].forEach(function (value) {
        expect(isNumber(value)).toBe(false);
      });
    });
  });
});

describe('isPositive()', function () {
  describe('given zero or a positive number', function () {
    it('should return true', function () {
      [0, 1, 0.01, 100].forEach(function (value) {
        expect(isPositive(value)).toBe(true);
      });
    });
  });

  describe('given a negative number', function () {
    it('should return false', function () {
      [-1, -0.01, -100].forEach(function (value) {
        expect(isPositive(value)).toBe(false);
      });
    });
  });
});

describe('isPositiveNumber()', function () {
  describe('given a valid positive number', function () {
    it('should return true', function () {
      [0, 1, 0.01, 100].forEach(function (value) {
        expect(isPositiveNumber(value)).toBe(true);
      });
    });
  });

  describe('given a non-number or a negative number', function () {
    it('should return false', function () {
      [-1, -0.01, -100, 'foo', true, false, void 0, null, Function].forEach(function (value) {
        expect(isPositiveNumber(value)).toBe(false);
      });
    });
  });
});

describe('isString()', function () {
  describe('given a string', function () {
    it('should return true', function () {
      ['', 'foo', ' '].forEach(function (value) {
        expect(isString(value)).toBe(true);
      });
    });
  });

  describe('given a non-string or a boxed string', function () {
    it('should return false', function () {
      [1, new String('foo'), Infinity, {}, [], Object].forEach(function (value) {
        expect(isString(value)).toBe(false);
      });
    });
  });
});

describe('isNonEmptyString()', function () {
  describe('given a non-empty string', function () {
    it('should return true', function () {
      ['foo', 'bar', '1', 'true'].forEach(function (value) {
        expect(isNonEmptyString(value)).toBe(true);
      });
    });
  });

  describe('given a non-string or an empty string', function () {
    it('should return false', function () {
      ['', Function, void 0, null, false, true, 1].forEach(function (value) {
        expect(isNonEmptyString(value)).toBe(false);
      });
    });
  });
});

describe('isFunction()', function () {
  describe('given a function', function () {
    it('should return true', function () {
      [function () {}, new Function(), parseInt, Object].forEach(function (value) {
        expect(isFunction(value)).toBe(true);
      });
    });
  });

  describe('given a non-function', function () {
    it('should return false', function () {
      [1, '', {}, false, new Date()].forEach(function (value) {
        expect(isFunction(value)).toBe(false);
      });
    });
  });
});

describe('isObject()', function () {
  describe('given an object', function () {
    it('should return true', function () {
      [[], {}, Function, arguments].forEach(function (value) {
        expect(isObject(value)).toBe(true);
      });
    });
  });

  describe('given a non-object', function () {
    it('should return false', function () {
      [1, true, false, void 0, null, 'foo'].forEach(function (value) {
        expect(isObject(value)).toBe(false);
      });
    });
  });
});

describe('isArray()', function () {
  describe('given an array', function () {
    it('should return true', function () {
      [[], new Array(3), [1], ['a', 'b']].forEach(function (value) {
        expect(isArray(value)).toBe(true);
      });
    });
  });

  describe('given a non-array, or an array-like object', function () {
    it('should return false', function () {
      [arguments, {}, 0, 'foo', true, 10, new Date()].forEach(function (value) {
        expect(isArray(value)).toBe(false);
      });
    });
  });
});

describe('isArguments()', function () {
  describe('given an arguments object', function () {
    it('should return true', function () {
      expect(isArguments(arguments)).toBe(true);
    });
  });

  describe('given a value that is not the arguments object', function () {
    it('should return false', function () {
      ['', null, void 0, [1, 2], {}, Function].map(function (value) {
        expect(isArguments(value)).toBe(false);
      })
    });
  });
});

describe('isInstanceOf()', function () {
  var MockType = function () {};

  describe('given a value that is an instance of type', function () {
    it('should return true', function () {
      var mock1 = new MockType();
      var mock2 = new MockType();

      [mock1, mock2].forEach(function (value) {
        expect(isInstanceOf(value, MockType)).toBe(true);
      });
    });
  });

  describe('given a value that is not an instance of type', function () {
    it('should return false', function () {
      var mock1 = new Object();
      var mock2 = new String();

      [mock1, mock2].forEach(function (value) {
        expect(isInstanceOf(value, MockType)).toBe(false);
      });
    });
  });
});

describe('toArray()', function () {
  describe('given an array-like value', function () {
    it('should return an array', function () {
      [['a'], arguments, 'b'].forEach(function (value) {
        expect(toArray(value)).toEqual(jasmine.any(Array));
      })
    });
  });
});

describe('normalizeVariadic()', function () {
  describe('given an array-like value', function () {
    describe('when the length is zero', function () {
      it('should return an empty array', function () {
        [[], arguments].map(function (value) {
          var result = normalizeVariadic(value);

          expect(result).toEqual(jasmine.any(Array));
          expect(result.length).toBe(0);
        });
      });
    });

    describe('when the length is one', function () {
      describe('and the first element is an array', function () {
        it('should return the first element', function () {
          function test() {
            expect(normalizeVariadic(arguments)).toEqual([1, 2, 3]);
          }

          test([1, 2, 3]);
        });
      });

      describe('and the first element is not an array', function () {
        it('should return the value wrapped in an array', function () {
          function test() {
            expect(normalizeVariadic(arguments)).toEqual([1]);
          }

          test(1);
        });
      });
    });

    describe('when the length is greater than one', function () {
      it('should convert the array-like object to an array', function () {
        function test() {
          expect(normalizeVariadic(arguments)).toEqual([1, 2, 3]);
        }

        test(1, 2, 3);
      });
    });
  });

  describe('given a non-array-like value', function () {
    it('should return an empty array', function () {
      [1, {}, false, true, Object].map(function (value) {
        expect(normalizeVariadic(value)).toEqual([]);
      });
    });
  });
});
