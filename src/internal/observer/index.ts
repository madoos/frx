import type { Next, Er, Complete, Unsubscribe } from '../types';

export const observer = <T>(
  next: Next<T>,
  error: Er,
  complete: Complete,
  unsubscribe: Unsubscribe
): [Next<T>, Er, Complete] => {
  let isCompleted = false;

  const ensureNext = (val: T) => {
    if (isCompleted) return;

    try {
      next(val);
    } catch (e) {
      ensureError(e);
    }
  };

  const ensureError = (e: unknown) => {
    if (isCompleted) return;
    isCompleted = true;
    error(e);
    unsubscribe();
  };

  const ensureComplete = () => {
    if (isCompleted) return;
    isCompleted = true;
    complete();
    unsubscribe();
  };

  return [ensureNext, ensureError, ensureComplete];
};
