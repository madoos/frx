import type { Producer, Observable, Unsubscribe } from '../types';
import { observer } from '../observer';
import { noop, tryCatch } from '../helpers';

export const observable =
  <T>(producer: Producer<T>): Observable<T> =>
  (next = noop<T>, error = noop, complete = noop<void>) => {
    let unsubscribe: Unsubscribe = noop;
    const ensureUnsubscribe = () => unsubscribe();

    const [next_, error_, _complete_] = observer(
      next,
      error,
      complete,
      ensureUnsubscribe
    );

    unsubscribe = tryCatch(
      () => producer(next_, error_, _complete_),
      error,
      noop
    );

    return unsubscribe;
  };
