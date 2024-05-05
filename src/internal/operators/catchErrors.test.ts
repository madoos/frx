import { noop } from '../helpers';
import { observable } from '../observable';
import { from } from '../observable/from';
import { catchError } from './catchError';

describe('catchError', () => {
  it('should catch errors', () => {
    const src = observable<number>((next, error) => {
      next(1);
      error(new Error());
      return noop;
    });

    const handleError = catchError(() => from([2, 3]));
    const handled = handleError(src);

    expect(handled).toSubscribe((next, _error, complete) => [
      next(1),
      next(2),
      next(3),
      complete(),
    ]);
  });
});
