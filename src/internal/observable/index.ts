import type { Producer, Observable, Unsubscribe } from '../types';
import { observer } from '../observer';
import { noop } from '../helpers';

export const observable =
  <T>(producer: Producer<T>): Observable<T> =>
  (next = noop<T>, error = noop, complete = noop<void>) => {
    let unsubscribe: Unsubscribe = noop;

    const [next_, error_, _complete_] = observer(
      next,
      error,
      complete,
      unsubscribe
    );

    unsubscribe = producer(next_, error_, _complete_);

    return unsubscribe;
  };
