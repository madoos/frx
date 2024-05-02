import { observable } from '.';
import { noop } from '../helpers';

export const empty = observable<never>((_next, _error, complete) => {
  complete();
  return noop;
});
