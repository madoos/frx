import { from } from './from';

describe('Observable/from', () => {
  test('should create iterable into observable', () => {
    expect(from([1, 2])).toEmit((next, _error, complete) => [
      next(1),
      next(2),
      complete(),
    ]);
  });
});
