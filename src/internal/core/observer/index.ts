import type { Next, Er, Complete } from '../../types';

export const observer = <T, E>(
  next: Next<T>,
  error: Er<E>,
  complete: Complete
): [Next<T>, Er<E>, Complete] => {
  let isCompleted = false;

  return [
    (x) => !isCompleted && next(x),
    (e) => !isCompleted && (isCompleted = true) && error(e),
    () => !isCompleted && (isCompleted = true) && complete(),
  ];
};
