import type { Producer, Observable } from '../types';
import { observer } from '../observer';
import { noop, tryCatch } from '../helpers';

export const observable =
  <T>(producer: Producer<T>): Observable<T> =>
  (next = noop<T>, error = noop, complete = noop<void>) => {
    const [next_, error_, complete_] = observer(next, error, complete);

    return tryCatch(
      () => producer(next_, error_, complete_),
      (e) => error_(e),
      noop
    );
  };
