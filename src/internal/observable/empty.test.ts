import { empty } from './empty';

describe('observable/empty', () => {
  test('should not emit values', () => {
    expect(empty).toSubscribe((_next, _error, completed) => [completed()]);
  });
});
