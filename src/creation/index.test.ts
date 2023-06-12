import { from } from '.';

describe('creation public api', () => {
  test('should expose from', () => {
    expect(from).toBeInstanceOf(Function);
  });
});
