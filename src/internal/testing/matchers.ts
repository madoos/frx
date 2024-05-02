import { Complete, Er, Next, Observable } from '../types';

export interface ObservableValue<T> {
  type: 'next' | 'complete' | 'error';
  value?: T | unknown;
}

export type ExpectedObservableResult<T> = Array<ObservableValue<T>>;

export type ExpectedObservable<T, E = unknown> = (
  next: (x: T) => ObservableValue<T>,
  error: (x: E) => ObservableValue<T>,
  complete: () => ObservableValue<T>
) => ExpectedObservableResult<T>;

export interface ToSubscribeOptions {
  times: number;
}

expect.extend({
  toSubscribe<T>(
    observable: Observable<T>,
    expected: ExpectedObservable<T>,
    options?: ToSubscribeOptions
  ) {
    const next = (value: T): ObservableValue<T> => ({ type: 'next', value });
    const error = (e: unknown): ObservableValue<T> => ({
      type: 'error',
      value: e,
    });
    const complete = (): ObservableValue<T> => ({ type: 'complete' });

    const hasOptions = typeof options === 'object';
    const emissions: ExpectedObservableResult<T> = [];

    const next_: Next<T> = jest.fn().mockImplementation((value) => {
      emissions.push(next(value));
    });
    const error_: Er = jest.fn().mockImplementation((e) => {
      emissions.push(error(e));
    });
    const complete_: Complete = jest.fn().mockImplementation(() => {
      emissions.push(complete());
    });

    const handleExpect = () => {
      try {
        expect(emissions).toEqual(expected(next, error, complete));
        return { pass: true, message: () => '' };
      } catch (e: unknown) {
        return {
          pass: false,
          message: () => (e as { message: string }).message,
        };
      }
    };

    return new Promise<void>((resolve) => {
      observable(
        (val) => {
          next_(val);
          if (hasOptions) {
            options.times--;
            if (options.times === 0) {
              resolve();
            }
          }
        },
        (e) => {
          error_(e);
          resolve();
        },
        () => {
          complete_();
          resolve();
        }
      );
    }).then(handleExpect);
  },
});
