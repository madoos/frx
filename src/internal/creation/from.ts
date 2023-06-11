import { noop } from '../core/helpers';
import { observable } from '../core/observable';

export const from = <T>(xs: Iterable<T>) =>
  observable<T, never>((next, _error, complete) => {
    for (const x of xs) next(x);
    complete();
    return noop;
  });

console.log(1);
console.log(1);
