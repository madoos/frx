import { Matchers, CustomMatcher } from '@jest/types';

type ExpectedObservable<T, E> = (
  next: (x: T) => ObservableValue<T, E>,
  error: (x: E) => ObservableValue<T, E>,
  complete: () => ObservableValue<T, E>
) => ObservableResult<T, E>;

declare global {
  namespace jest {
    interface Matchers<R> {
      toEmit<T, E>(expected: ExpectedObservable<T, E>): R;
    }
  }
}
