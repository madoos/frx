import { ExpectedObservable } from './internal/testing/matchers';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toSubscribe<T, E>(expected: ExpectedObservable<T, E>): R;
    }
  }
}
