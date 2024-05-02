import { applyTo, pipe } from '.';
import { from } from '../observable/from';
import { map } from './map';

describe('should apply an operator to an observable', () => {
  it('should compose operators', () => {
    const numbers = from([1, 2, 3]);

    const applied = applyTo(
      numbers,
      map((n) => String(n))
    );

    expect(applied).toSubscribe((next, _error, complete) => [
      next('1'),
      next('2'),
      next('3'),
      complete(),
    ]);
  });
});

describe('Operators/pipe', () => {
  it('should compose operators', () => {
    const numbers = from([1, 2, 3]);

    const operator = pipe(
      map((n: number) => n + 1),
      map((n) => String(n)),
      map((s) => [s])
    );

    const piped = operator(numbers);

    expect(piped).toSubscribe((next, _error, complete) => [
      next(['2']),
      next(['3']),
      next(['4']),
      complete(),
    ]);
  });
});
