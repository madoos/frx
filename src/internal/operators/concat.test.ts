import { concat } from './concat';
import { marble } from '../testing';

describe('operators/concat', () => {
  it(
    'should concat observables sequential',
    marble(({ cold, expectObservable }) => {
      const values = {
        numbers: { a: 1, b: 2, c: 3 },
        letters: { d: 'a', e: 'b', f: 'c' },
        booleans: { g: true, h: false },
      };

      const numbers = cold('a-b-c-|', values.numbers);
      const letters = cold('d-e-f-|', values.letters);
      const booleans = cold('g-h-|', values.booleans);

      const all = concat(numbers, letters, booleans);

      return expectObservable(all).toBe('a-b-c-d-e-f-g-h-|', {
        ...values.numbers,
        ...values.letters,
        ...values.booleans,
      });
    })
  );
});
