import { marble } from '../testing';
import { timer } from './timer';
import { createSyncScheduler } from '../testing/scheduler';

describe('observer/timer', () => {
  it(
    'should emit a timer',
    marble(({ expectObservable }) => {
      const scheduler = createSyncScheduler({ times: 1 });
      const src = timer(100, scheduler);

      const expected = '(a|)';
      const values = { a: 0 };

      expectObservable(src).toBe(expected, values);
    })
  );
});
