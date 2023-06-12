import { observable, from, empty } from '.';

describe('public api', () => {
  test('should expose observable', () => {
    expect(observable).toBeInstanceOf(Function);
  });

  test('should expose from', () => {
    expect(from).toBeInstanceOf(Function);
  });

  test('should expose empty', () => {
    expect(empty).toBeInstanceOf(Function);
  });
});
