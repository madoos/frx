import { observable } from '.';
import { noop } from '../helpers';

describe('Observable', () => {
  test('Should emit values and complete', () => {
    const numbers = observable((next, _error, complete) => {
      next(1);
      next(2);
      complete();
      return noop;
    });

    expect(numbers).toSubscribe((next, _error, complete) => [
      next(1),
      next(2),
      complete(),
    ]);
  });

  test('Should close emission when an error occurs', () => {
    const numbers = observable((next, error, complete) => {
      next(1);
      error('Oops!');
      next(2);
      complete();
      return noop;
    });

    expect(numbers).toSubscribe((next, error) => [next(1), error('Oops!')]);
  });

  test('Should complete emission when complete is called', () => {
    const numbers = observable((next, error, complete) => {
      next(1);
      complete();
      error('Oops!');
      next(2);
      return noop;
    });

    expect(numbers).toSubscribe((next, _error, complete) => [
      next(1),
      complete(),
    ]);
  });

  test('Should handle errors in producer function', () => {
    const numbers = observable(() => {
      throw '!Oops';
    });

    expect(numbers).toSubscribe((_next, error) => [error('!Oops')]);
  });
});
