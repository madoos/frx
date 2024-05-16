import { tap } from './tap';
import { from } from '../observable/from';
import { observable } from '../observable';
import { noop } from '../helpers';

describe('operators/tap', () => {
  it('should do side effects', () => {
    const next = jest.fn();
    const complete = jest.fn();
    const error = jest.fn();

    const tapped = tap(next, error, complete);
    const numbers = tapped(from([1]));

    numbers();

    expect(next).toBeCalled();
    expect(complete).toBeCalled();
  });

  it('should do side effects with error', () => {
    const next = jest.fn();
    const complete = jest.fn();
    const error = jest.fn();

    const src = observable<number>((next, error) => {
      next(1);
      error(new Error());
      return noop;
    });

    const tapped = tap(next, error, complete);
    const numbers = tapped(src);

    numbers();

    expect(next).toBeCalled();
    expect(error).toBeCalled();
  });
});
