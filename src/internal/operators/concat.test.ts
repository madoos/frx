import { from } from '../observable/from';
import { concat } from './concat';

describe('concat', () => {
  it('should concat observables sequential', () => {
    const numbers = from([1, 2, 3]);
    const letters = from(['a', 'b', 'c']);
    const booleans = from([true, false]);

    const all = concat(numbers, letters, booleans);

    expect(all).toSubscribe((next, _error, complete) => [
      next(1),
      next(2),
      next(3),
      next('a'),
      next('b'),
      next('c'),
      next(true),
      next(false),
      complete(),
    ]);
  });
});
