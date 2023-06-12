import { observable } from '.';
import { noop, isIterable, isPromise, isString } from '../helpers';

export const fromIterable = <T>(xs: Iterable<T> | string) =>
  observable<T | string, never>((next, _error, complete) => {
    for (const x of xs) next(x);
    complete();
    return noop;
  });

export const fromPromise = <T>(xs: Promise<T>) =>
  observable<T, unknown>((next, error, complete) => {
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

export const from = <T>(xs: Iterable<T> | Promise<T>) => {
  if (isIterable(xs) || isString(xs)) return fromIterable(xs);
  if (isPromise(xs)) return fromPromise(xs);
  throw new Error('Value must to be an Iterable or Promise');
};
