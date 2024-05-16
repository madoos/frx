import { marble } from '../testing';
import { catchError } from './catchError';

describe('operators/catchError', () => {
  it(
    'should catch errors',
    marble(({ cold, expectObservable }) => {
      const values = {
        src: { a: 1, b: 2 },
        errorHandling: { c: 3, d: 4 },
      };

      const src = cold('a-b-#', values.src, new Error());

      const handleError = catchError(() => cold('c-d-|', values.errorHandling));
      const handled = handleError(src);

      expectObservable(handled).toBe('a-b-c-d-|', {
        ...values.src,
        ...values.errorHandling,
      });
    })
  );
});
