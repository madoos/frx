import { observable, from } from '.';

describe('public api', () => {
  test('should expose observable', () => {
    expect(observable).toBeInstanceOf(Function);
  });

  test('should expose from', () => {
    expect(from).toBeInstanceOf(Function);
  });
});
