import { observable } from '.';
import { noop } from '../helpers';
import { asyncScheduler } from '../scheduler/async';
import { Scheduler } from '../types';

/**
 * Creates an observable that completes after a specified delay (depending of the scheduler passed).
 */
export const timer = (ms: number, scheduler: Scheduler = asyncScheduler) =>
  observable<number>((next, _error, complete) => {
    let unsubscribe: () => void = noop;

    unsubscribe = scheduler(() => {
      next(0);
      complete();
    }, ms);

    return unsubscribe;
  });
