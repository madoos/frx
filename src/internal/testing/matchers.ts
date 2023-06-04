import { Complete, Er, Next, Observable } from '../types';
import { ExpectedObservable } from '../types/jest';

interface ObservableValue<T, E> {
  type: 'next' | 'complete' | 'error';
  value?: T | E;
}

type ObservableResult<T, E> = Array<ObservableValue<T, E>>;

expect.extend({
  toEmit<T, E>(
    observable: Observable<T, E>,
    expected: ExpectedObservable<T, E>
  ) {
    const next = (value: T): ObservableValue<T, E> => ({ type: 'next', value });
    const error = (e: E): ObservableValue<T, E> => ({
      type: 'error',
      value: e,
    });
    const complete = (): ObservableValue<T, E> => ({ type: 'complete' });

    const emissions: ObservableResult<T, E> = [];

    const next_: Next<T> = jest.fn().mockImplementation((value) => {
      emissions.push(next(value));
    });
    const error_: Er<E> = jest.fn().mockImplementation((e) => {
      emissions.push(error(e));
    });
    const complete_: Complete = jest.fn().mockImplementation(() => {
      emissions.push(complete());
    });

    observable(next_, error_, complete_);

    try {
      expect(emissions).toEqual(expected(next, error, complete));
      return { pass: true, message: () => '' };
    } catch (e: unknown) {
      return { pass: false, message: () => (e as { message: string }).message };
    }
  },
});
