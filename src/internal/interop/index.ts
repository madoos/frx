import { Observable } from '../types';
import { ObservableProtocol, ObservableConstructable } from '../types/interop';
import { observable } from '../observable';

/**
 * Converts an `ObservableProtocol` into an `Observable`.
 *
 * This function serves as part of an isomorphism between any observable that complies with the `ObservableProtocol`
 * and the implementation of observables in this library.
 *
 */
export const from = <T>(src: ObservableProtocol<T>): Observable<T> => {
  return observable((next, error, complete) => {
    const sub = src.subscribe({ next, error, complete });
    return () => sub.unsubscribe();
  });
};

/**
 * Converts an `Observable` into a custom `ObservableProtocol` using a constructor.
 *
 * This function serves as part of an isomorphism between the implementation of observables in this library
 * and any observable that complies with the `ObservableProtocol`.
 *
 */
export const to =
  <C extends ObservableConstructable<unknown>>(ObservableConstructor: C) =>
  <T>(src: Observable<T>) => {
    return new ObservableConstructor((observer) => {
      return src(
        (val) => observer.next(val),
        (e) => observer.error(e),
        () => observer.complete()
      );
    }) as unknown as C;
  };
