import { noop } from '../core/helpers';
import { observable } from '../core/observable';

export const empty = observable<never, never>((_next, _error, complete) => {
  complete();
  return noop;
});
