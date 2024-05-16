import { applyTo, pipe } from '.';
import { map } from './map';
import { marble } from '../testing';

describe('operators/apply', () => {
  it(
    'should apply operator',
    marble(({ cold, expectObservable }) => {
      const numbers = cold('a-b-c-|', { a: 1, b: 2, c: 3 });

      const applied = applyTo(
        numbers,
        map((n: number) => String(n))
      );

      expectObservable(applied).toBe('a-b-c-|', { a: '1', b: '2', c: '3' });
    })
  );
});

describe('operators/pipe', () => {
  it(
    'should compose operators',
    marble(({ cold, expectObservable }) => {
      const numbers = cold('a-b-c-|', { a: 1, b: 2, c: 3 });

      const operator = pipe(
        map((n: number) => n + 1),
        map((n) => String(n)),
        map((s) => [s])
      );

      const piped = operator(numbers);

      expectObservable(piped).toBe('a-b-c-|', { a: ['2'], b: ['3'], c: ['4'] });
    })
  );
});
