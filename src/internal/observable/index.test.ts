import { marble } from '../testing';
import { observable } from '.';
import { noop } from '../helpers';

describe('Observable', () => {
  test(
    'Should emit values and complete',
    marble(({ expectObservable }) => {
      const values = { a: 1, b: 2 };

      const numbers = observable((next, _error, complete) => {
        next(values.a);
        next(values.b);
        complete();
        return noop;
      });

      expectObservable(numbers).toBe('(ab|)', values);
    })
  );

  test(
    'Should close emission when an error occurs',
    marble(({ expectObservable }) => {
      const values = { a: 1, b: 2 };

      const numbers = observable((next, error) => {
        next(values.a);
        error(new Error());
        next(values.b); // This emission will not happen because of the error
        return noop;
      });

      expectObservable(numbers).toBe('(a#)', values, new Error());
    })
  );

  test(
    'Should complete emission when complete is called',
    marble(({ expectObservable }) => {
      const values = { a: 1, b: 2 };

      const numbers = observable((next, _error, complete) => {
        next(values.a);
        complete();
        next(values.b); // This emission will not happen because of the complete
        return noop;
      });

      expectObservable(numbers).toBe('(a|)', values);
    })
  );

  test(
    'Should handle errors in producer function',
    marble(({ expectObservable }) => {
      const numbers = observable(() => {
        throw new Error();
      });

      expectObservable(numbers).toBe('#', undefined, new Error());
    })
  );
});
