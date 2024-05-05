import { timer } from './timer';
import { createSyncScheduler } from '../testing/scheduler';

describe('observer/timer', () => {
  it('should emit a timer', () => {
    const scheduler = createSyncScheduler({ times: 1 });
    const src = timer(100, scheduler);

    return expect(src).toSubscribe((next, _error, complete) => {
      return [next(0), complete()];
    });
  });
});
