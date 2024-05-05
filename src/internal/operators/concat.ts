import { observable } from '../observable';
import { empty } from '../observable/empty';
import { Unsubscribe } from '../types';
import { fold } from '../algebra/monoid';

/**
 * Combines multiple observables into one observable sequence by subscribing to each observable in order and emitting their values sequentially.
 */
export const concat = fold(empty, (src1, src2) =>
  observable((next, error, complete) => {
    let unsubscribe: Unsubscribe;

    unsubscribe = src1(
      (val) => next(val),
      error,
      () => (unsubscribe = src2(next, error, complete))
    );

    return unsubscribe;
  })
);
