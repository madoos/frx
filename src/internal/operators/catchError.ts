import { observable } from '../observable';
import { Observable, Unsubscribe } from '../types';

export const catchError =
  <B>(errorHandler: (e: unknown) => Observable<B>) =>
  <A>(src: Observable<A>) =>
    observable<A | B>((next, error, complete) => {
      let unsubscribe: Unsubscribe;

      unsubscribe = src(
        next,
        (e) => {
          const handler = errorHandler(e);
          unsubscribe = handler(next, error, complete);
        },
        complete
      );

      return unsubscribe;
    });
