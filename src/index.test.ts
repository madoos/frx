import { observable } from '.';

describe('public api', () => {
  test('should expose observable', () => {
    expect(observable).toBeInstanceOf(Function);
  });
});
