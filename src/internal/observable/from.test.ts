import { from } from './from';

describe('Observable/from', () => {
  test('should create iterable into observable', () => {
    expect(from([1, 2])).toSubscribe((next, _error, complete) => [
      next(1),
      next(2),
      complete(),
    ]);
  });

  test('should create string into observable of charters', () => {
    expect(from('hello')).toSubscribe((next, _error, complete) => [
      next('h'),
      next('e'),
      next('l'),
      next('l'),
      next('o'),
      complete(),
    ]);
  });

  test('should create observable from promise', () => {
    return expect(from(Promise.resolve(1))).toSubscribe(
      (next, _error, complete) => [next(1), complete()]
    );
  });

  test('should create observable from promise with error', () => {
    return expect(from(Promise.reject('oops!'))).toSubscribe((_next, error) => [
      error('oops!'),
    ]);
  });
});
