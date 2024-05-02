import { from } from '../observable/from';
import { identity } from './identity';

describe('identity', () => {
  it('should return the input observable as is', () => {
    const src = from([1, 2, 3]);

    expect(identity(src)).toSubscribe((next, _error, complete) => [
      next(1),
      next(2),
      next(3),
      complete(),
    ]);
  });
});
