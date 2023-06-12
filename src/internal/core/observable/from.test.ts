import { from } from './from';

describe('Observable/from', () => {
  test('should create iterable into observable', () => {
    expect(from([1, 2])).toEmit((next, _error, complete) => [
      next(1),
      next(2),
      complete(),
    ]);
  });

  test('should create string into observable of charters', () => {
    expect(from('hello')).toEmit((next, _error, complete) => [
      next('h'),
      next('e'),
      next('l'),
      next('l'),
      next('o'),
      complete(),
    ]);
  });

  test('should create observable from promise', () => {
    return expect(from(Promise.resolve(1))).toEmit((next, _error, complete) => [
      next(1),
      complete(),
    ]);
  });

  test('should create observable from promise with error', () => {
    return expect(from(Promise.reject('oops!'))).toEmit((_next, error) => [
      error('oops!'),
    ]);
  });
});
