import { observable } from '.';
import { noop } from '../helpers';

/**
 * Creates an observable that completes immediately without emitting any values.
 */
export const empty = observable<never>((_next, _error, complete) => {
  complete();
  return noop;
});
