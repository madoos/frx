import { interval } from './interval';
import { createSyncScheduler } from '../testing/scheduler';

describe('observer/interval', () => {
  it('should emit values', () => {
    const scheduler = createSyncScheduler({ times: 3 });
    const src = interval(100, scheduler);

    return expect(src).toSubscribe(
      (next) => {
        return [next(0), next(1), next(2)];
      },
      { times: 3 }
    );
  });
});
