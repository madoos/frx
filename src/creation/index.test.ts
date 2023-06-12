import { from, empty } from '.';

describe('creation public api', () => {
  test('should expose from', () => {
    expect(from).toBeInstanceOf(Function);
  });

  test('should expose empty', () => {
    expect(empty).toBeInstanceOf(Function);
  });
});
