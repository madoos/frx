import { noop } from '../helpers';
import { observable } from '../observable';
import { from } from '../observable/from';
import { tap } from './tap';

describe('tap', () => {
  it('should do side effects', async () => {
    const next = jest.fn();
    const complete = jest.fn();
    const error = jest.fn();

    const tapped = tap(next, error, complete);
    const numbers = tapped(from([1, 2, 3]));

    await expect(numbers).toSubscribe((next, _error, complete) => [
      next(1),
      next(2),
      next(3),
      complete(),
    ]);

    expect(next).toBeCalled();
    expect(complete).toBeCalled();
  });

  it('should do side effects with error', async () => {
    const src = observable<number>((next, error) => {
      next(1);
      error(new Error());
      return noop;
    });

    const next = jest.fn();
    const complete = jest.fn();
    const error = jest.fn();

    const tapped = tap(next, error, complete);
    const numbers = tapped(src);

    await expect(numbers).toSubscribe((next, error) => [
      next(1),
      error(new Error()),
    ]);

    expect(next).toBeCalled();
    expect(error).toBeCalled();
  });
});
