import { Scheduler } from '../types';

/**
 * Creates a scheduler that executes a callback function at regular intervals using `setInterval`.
 */
export const asyncScheduler: Scheduler = (execute, delay) => {
  const id = setInterval(execute, delay);
  return () => clearInterval(id);
};
