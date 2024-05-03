import { observable } from '.';
import type { Observable } from '../types';
import { noop, isIterable, isPromise, isString } from '../helpers';

export const fromIterable = <T>(values: Iterable<T>): Observable<T> => {
  return observable((next, error, complete) => {
    for (const x of values) {
      next(x);
    }
    complete();
    return noop;
  });
};

export const fromPromise = <T>(xs: Promise<T>) =>
  observable<T>((next, error, complete) => {
    let canceled = false;

    xs.then((x) => {
      if (!canceled) {
        next(x);
        complete();
      }
    }).catch(error);

    return () => {
      canceled = true;
    };
  });

/**
 * Creates an observable from an iterable or a promise.
 */
export const from = <T>(xs: Iterable<T> | Promise<T>) => {
  if (isIterable(xs)) return fromIterable(xs);
  if (isPromise(xs)) return fromPromise(xs);
  throw new Error('Value must to be an Iterable or Promise');
};
