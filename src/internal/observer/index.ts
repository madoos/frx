import type { Next, Er, Complete } from '../types';

export const observer = <T>(
  next: Next<T>,
  error: Er,
  complete: Complete
): [Next<T>, Er, Complete] => {
  let isCompleted = false;

  return [
    (x) => !isCompleted && next(x),
    (e) => !isCompleted && (isCompleted = true) && error(e),
    () => !isCompleted && (isCompleted = true) && complete(),
  ];
};
