import { noop, tryCatch } from '../helpers';
import { observable } from '../observable';
import { Observable } from '../types';

/**
 * Transforms the values provided by the input observable using a mapping function.
 */
export const map =
  <I, O>(f: (val: I) => O) =>
  (src: Observable<I>) => {
    return observable<O>((next, error, complete) => {
      return tryCatch(
        () => src((val) => next(f(val)), error, complete),
        error,
        noop
      );
    });
  };
