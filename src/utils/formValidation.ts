import { stringToFloat } from './berths';

export const mustBePresent = (value: any): any =>
  value ? undefined : 'validation.message.required';

export const mustBeNumber = (value: any): any =>
  isNaN(value) ? 'validation.message.must_be_number' : undefined;

export const mustBePositiveNumber = (value: string): string | undefined => {
  const fixedFloatValue: number = stringToFloat((value || '').replace(',', '.'));

  if (isNaN(fixedFloatValue)) {
    return 'validation.message.must_be_number';
  }
  if (fixedFloatValue < 0) {
    return 'validation.message.must_be_positive_number';
  }

  return undefined;
};

export const mustBePhoneNumber = (value: any): any => {
  const phoneRe = /^([0-9\(\)\s\+\-])+$/im;
  if (phoneRe.test(value)) {
    return undefined;
  }
  return 'validation.message.must_be_phone_number';
};

export const mustBeEmail = (value: any): any => {
  const emailRe = /^.*\@.*\..*$/im;
  if (emailRe.test(value)) {
    return undefined;
  }
  return 'validation.message.must_be_email';
};

export default (f1: Function | null, f2: Function | null) => (x: any): any => {
  let validated;
  if (f1) {
    validated = f1(x);
  }
  if (!validated && f2) {
    validated = f2(x);
  }
  return validated;
};
