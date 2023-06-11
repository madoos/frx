import { empty } from './empty';

describe('Observable/from', () => {
  test('should create iterable into observable', () => {
    expect(empty).toEmit((_next, _error, complete) => [complete()]);
  });
});
