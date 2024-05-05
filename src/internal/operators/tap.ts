import { Observable } from '../types';
import { noop } from '../helpers';
import { observable } from '../observable';

/**
 * Performs side effects for each emission in the source observable, but does not affect the emitted values.
 */
export const tap =
  <A>(
    tapNext: (a: A) => void = noop,
    tapError: (e: unknown) => void = noop,
    tapComplete: () => void = noop
  ) =>
  <T extends A>(src: Observable<T>) =>
    observable<T>((next, error, complete) => {
      return src(
        (x) => {
          tapNext(x);
          next(x);
        },
        (e) => {
          tapError(e);
          error(e);
        },
        () => {
          tapComplete();
          complete();
        }
      );
    });
