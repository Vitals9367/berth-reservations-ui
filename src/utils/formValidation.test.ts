import validator, {
  mustBeEmail,
  mustBeNames,
  mustBeSsn,
  mustNotExceedTwoDecimals,
} from './formValidation';

describe('formValidation', () => {
  describe('mustBeNames', () => {
    test('should return undefined if name count is ok and names are valid', () => {
      expect(mustBeNames(1)('Aki')).toBeUndefined();
      expect(mustBeNames(3)('Aki')).toBeUndefined();
      expect(mustBeNames(3)('Jukka-Pekka Matti Antero')).toBeUndefined();
      expect(mustBeNames(3)('Øyvind Pär Ánton')).toBeUndefined();
    });
    test('should return an error message if there is no name', () => {
      expect(mustBeNames(1)('')).toEqual('validation.message.invalid_value');
      expect(mustBeNames(1)(' ')).toEqual('validation.message.invalid_value');
    });
    test('should return an error message if name count is over maxNames', () => {
      expect(mustBeNames(2)('Jukka Pekka Antero')).toEqual('validation.message.invalid_value');
    });
    test('should return an error message if there is extra whitespace', () => {
      expect(mustBeNames(2)(' Jukka Pekka')).toEqual('validation.message.invalid_value');
      expect(mustBeNames(2)('Jukka Pekka ')).toEqual('validation.message.invalid_value');
    });
    test('should return an error message if the names are invalid', () => {
      expect(mustBeNames(2)('Ville%')).toEqual('validation.message.invalid_value');
      expect(mustBeNames(2)('😀')).toEqual('validation.message.invalid_value');
      expect(mustBeNames(2)('寅泰')).toEqual('validation.message.invalid_value');
    });
  });

  describe('mustNotExceedTwoDecimals', () => {
    test('should return undefined if the value has no more than two decimals', () => {
      expect(mustNotExceedTwoDecimals('1000.00')).toBeUndefined();
    });

    test('should return an error message if the value has more than two decimals', () => {
      expect(mustNotExceedTwoDecimals('1000.000')).toEqual('validation.message.invalid_value');
    });

    test('should return an error message if the value has no digits after the decimal point', () => {
      expect(mustNotExceedTwoDecimals('1000.')).toEqual('validation.message.invalid_value');
    });
  });

  describe('mustBeEmail', () => {
    test('should return undefined if the email is valid', () => {
      expect(mustBeEmail('test@example.com')).toBeUndefined();
    });

    test('should return an error message if the email is invalid', () => {
      expect(mustBeEmail('test@.com')).toEqual('validation.message.must_be_email');
    });
  });

  describe('validator', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('should run all the provided functions on the provided value', () => {
      const value = 'foo';
      validator(fn1, fn2, fn3)(value);

      expect(fn1).toHaveBeenCalledWith(value);
      expect(fn2).toHaveBeenCalledWith(value);
      expect(fn3).toHaveBeenCalledWith(value);
    });

    test('it accepts null instead of a function', () => {
      expect(() => validator(fn1, null, fn3)('foo')).not.toThrowError();
    });

    test('it returns undefined if all the provided functions return undefined', () => {
      expect(validator(fn1, fn2, fn3)('foo')).toBeUndefined();
    });

    test('it returns the return value of the first provided function', () => {
      const err1 = 'err1';
      const err2 = 'err2';
      const withErrFn1 = jest.fn().mockReturnValue(err1);
      const withErrFn2 = jest.fn().mockReturnValue(err2);

      expect(validator(withErrFn1, withErrFn2)('foo')).toBe(err1);
    });
  });

  describe('mustBeSsn', () => {
    test('should return true for valid ssn', () => {
      expect(mustBeSsn('020175-033H')).toBeUndefined();
    });

    test('should return false if verification character is incorrect', () => {
      expect(mustBeSsn('020175-033A')).toEqual('validation.message.must_be_ssn');
    });

    test('should return false for malformed ssn', () => {
      [
        '020175033H',
        '02017-033H',
        '020175-03H',
        '020175K033H',
        '',
        '020175',
        '-033A',
        'A',
      ].forEach((value) => expect(mustBeSsn(value)).toEqual('validation.message.must_be_ssn'));
      expect.assertions(8);
    });
  });
});
