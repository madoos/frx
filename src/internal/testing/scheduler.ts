import { noop, times } from '../helpers';
import { Scheduler } from '../types';

/**
 * Creates a synchronous scheduler that executes a callback function multiple times synchronously.
 */
export const createSyncScheduler =
  (options: { times: number }): Scheduler =>
  (exec) => {
    times(exec, options.times);
    return noop;
  };
