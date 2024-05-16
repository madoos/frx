import { marble } from '../testing';
import { map } from './map';

describe('operators/map', () => {
  it(
    'should map values',
    marble(({ cold, expectObservable }) => {
      const numbers = cold('a-b-c-|', { a: 1, b: 2, c: 3 });
      const inc = map((n: number) => n + 1);
      const mapped = inc(numbers);

      expectObservable(mapped).toBe('x-y-z-|', { x: 2, y: 3, z: 4 });
    })
  );

  it(
    'should capture errors',
    marble(({ cold, expectObservable }) => {
      const numbers = cold('a-b-c-|', { a: 1, b: 2, c: 3 });

      const unsafeInc = map((n: number) => {
        if (n === 3) throw new Error();
        else return n + 1;
      });
      const mapped = unsafeInc(numbers);

      expectObservable(mapped).toBe('a-b-#', { a: 2, b: 3 }, new Error());
    })
  );
});
