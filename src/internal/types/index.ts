export type Next<T> = (x: T) => void;

export type Er = (e: unknown) => void;

export type Complete = () => void;

export type Unsubscribe = () => void;

export type Observer<T> = (
  next: Next<T>,
  error: Er,
  complete: Complete
) => [Next<T>, Er, Complete];

export type Observable<T> = (
  next?: Next<T>,
  error?: Er,
  complete?: Complete
) => Unsubscribe;

export type Producer<T> = (
  next: Next<T>,
  error: Er,
  complete: Complete
) => Unsubscribe;
