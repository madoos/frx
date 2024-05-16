import { TestScheduler } from 'rxjs/testing';
import { Observable as RxjsObservable } from 'rxjs';
import { from, to } from '../interop';
import { Observable } from '../types';

interface TestHelpers {
  cold: <T>(
    marbles: string,
    values?: { [marble: string]: T } | undefined,
    error?: unknown
  ) => Observable<T>;
  hot: <T>(
    marbles: string,
    values?: { [marble: string]: T } | undefined,
    error?: unknown
  ) => Observable<T>;
  expectObservable: <T>(src: Observable<T>) => {
    toBe: (
      marbles: string,
      values?: { [marble: string]: T } | undefined,
      error?: unknown
    ) => void;
  };
}

export const marble = (definition: (helpers: TestHelpers) => void) => () => {
  const tester = new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected)
  );

  return tester.run((rxjsHelpers) => {
    const { cold, hot, expectObservable } = rxjsHelpers;
    const toRxjs = to(RxjsObservable);

    return definition({
      cold: (...args) => from(cold(...args)),
      hot: (...args) => from(hot(...args)),
      expectObservable: (src, ...args) => {
        return expectObservable(
          toRxjs(src) as unknown as RxjsObservable<unknown>,
          ...args
        );
      },
    });
  });
};
