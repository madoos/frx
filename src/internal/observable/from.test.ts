import { marble } from '../testing';
import { from } from './from';

describe('Observable/from', () => {
  test(
    'should create iterable into observable',
    marble(({ expectObservable }) => {
      const src = from([1, 2]);
      expectObservable(src).toBe('(ab|)', { a: 1, b: 2 });
    })
  );

  test(
    'should create string into observable of characters',
    marble(({ expectObservable }) => {
      const result = from('hello');

      expectObservable(result).toBe('(abcde|)', {
        a: 'h',
        b: 'e',
        c: 'l',
        d: 'l',
        e: 'o',
      });
    })
  );

  test(
    'should create observable from promise',
    marble(({ expectObservable }) => {
      const promiseLike = {
        then: (f: (n: number) => unknown) => f(1),
      } as Promise<number>;

      const result = from(promiseLike);
      expectObservable(result).toBe('(a|)', { a: 1 });
    })
  );
});
