import { from } from '../observable/from';
import { map } from './map';

describe('Operators/map', () => {
  it('should map values', () => {
    const numbers = from([1, 2, 3]);
    const inc = map((n: number) => n + 1);
    const mapped = inc(numbers);

    expect(mapped).toSubscribe((next, _error, complete) => [
      next(2),
      next(3),
      next(4),
      complete(),
    ]);
  });

  it('should capture errors', () => {
    const numbers = from([1, 2, 3]);
    const expectedError = new Error('oops!');
    const inc = map((n: number) => {
      if (n === 2) throw expectedError;
      else return n + 1;
    });
    const mapped = inc(numbers);

    expect(mapped).toSubscribe((next, error) => [
      next(2),
      error(expectedError),
    ]);
  });
});
