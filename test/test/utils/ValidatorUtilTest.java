
const ValidatorUtil = require('../utils/validatorUtil'); 

describe('ValidatorUtil', () => {
  test('isValidPhone', () => {
    // expected TRUE cases
    expect(ValidatorUtil.isValidPhone('0123456789')).toBe(true);
    expect(ValidatorUtil.isValidPhone('09876543210')).toBe(true);

    // expected FALSE cases
    expect(ValidatorUtil.isValidPhone(null)).toBe(false);
    expect(ValidatorUtil.isValidPhone('')).toBe(false);
    expect(ValidatorUtil.isValidPhone('1234567890')).toBe(false);
    expect(ValidatorUtil.isValidPhone('012345678')).toBe(false);
    expect(ValidatorUtil.isValidPhone('012345678901')).toBe(false);
    expect(ValidatorUtil.isValidPhone('0abcdefghi')).toBe(false);
  });

  test('validateEmail', () => {
    // Required-field failures
    expect(ValidatorUtil.validateEmail(null)).toBe('Email is required!');
    expect(ValidatorUtil.validateEmail('')).toBe('Email is required!');
    expect(ValidatorUtil.validateEmail('   ')).toBe('Email is required!');

    // Format failures
    expect(ValidatorUtil.validateEmail('c')).toBe('Email is not valid!');
    expect(ValidatorUtil.validateEmail('ass.com')).toBe('Email is not valid!');
    expect(ValidatorUtil.validateEmail('ăe@')).toBe('Email is not valid!');
    expect(ValidatorUtil.validateEmail('@cá.com')).toBe('Email is not valid!');

    // Valid emails
    expect(ValidatorUtil.validateEmail('c@example.com')).toBe('');
    expect(
      ValidatorUtil.validateEmail('aac.name+tag+sorting@example.com')
    ).toBe('');
    expect(ValidatorUtil.validateEmail('aac@example.co.uk')).toBe('');
  });
});
