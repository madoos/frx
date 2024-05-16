import { marble } from '../testing';
import { interval } from './interval';
import { createSyncScheduler } from '../testing/scheduler';

describe('observer/interval', () => {
  it.skip(
    'should emit values',
    marble(({ expectObservable }) => {
      const scheduler = createSyncScheduler({ times: 3 });
      const src = interval(1000, scheduler);
      expectObservable(src).toBe('(abc|)', { a: 0, b: 1, c: 2 });
    })
  );
});
