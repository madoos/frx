import { observable } from '.';
import { asyncScheduler } from '../scheduler/async';
import { Scheduler } from '../types';

/**
 * Creates an observable that emits sequential numbers at regular intervals (depending of scheduler passed).
 */
export const interval = (ms: number, scheduler: Scheduler = asyncScheduler) => {
  return observable<number>((next) => {
    let i = 0;
    return scheduler(() => next(i++), ms);
  });
};
