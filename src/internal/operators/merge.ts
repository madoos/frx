import { observable } from '../observable';
import { empty } from '../observable/empty';
import { fold } from '../algebra/monoid';

/**
 * Merges multiple observables into a single observable.
 *
 * This function uses a monoidal fold to combine multiple observables into one. It subscribes to each observable
 * and emits their values in the order they are received. The merged observable completes only when all source
 * observables have completed.
 *
 * */
export const merge = fold(empty, (src1, src2) =>
  observable((next, error, complete) => {
    let isCompleted1 = false;
    let isCompleted2 = false;

    const ensureComplete = () => {
      if (isCompleted1 && isCompleted2) {
        complete();
      }
    };

    const unsubscribe1 = src1(
      (val) => next(val),
      error,
      () => {
        isCompleted1 = true;
        ensureComplete();
      }
    );

    const unsubscribe2 = src2(
      (val) => next(val),
      error,
      () => {
        isCompleted2 = true;
        ensureComplete();
      }
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  })
);
