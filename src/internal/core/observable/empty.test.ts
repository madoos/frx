import { empty } from './empty';

describe('observable/empty', () => {
  test('should not emit values', () => {
    expect(empty).toEmit((_next, _error, completed) => [completed()]);
  });
});
