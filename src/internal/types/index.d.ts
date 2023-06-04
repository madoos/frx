export type Next<T> = (x: T) => void;

export type Er<E> = (e: E) => void;

export type Complete = () => void;

export type Unsubscribe = () => void;

export type Observer<T, E> = (
  next: Next<T>,
  error: Er<E>,
  complete: Complete
) => [Next<T>, Er<E>, Complete];

export type Observable<T, E> = (
  next?: Next<T>,
  error?: Er<E>,
  complete?: Complete
) => Unsubscribe;

export type Producer<T, E> = (
  next: Next<T>,
  error: Er<E>,
  complete: Complete
) => Unsubscribe;

export type Operator<I, O> = (x: I) => O;
