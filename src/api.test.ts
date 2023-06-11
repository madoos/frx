import { observable } from '.';
import { from } from './creation';

describe('public api', () => {
  describe('core', () => {
    test('should observable to be exported', () => {
      expect(observable).toBeInstanceOf(Function);
    });
  });

  describe('creation', () => {
    test('should from to be exported', () => {
      expect(from).toBeInstanceOf(Function);
    });
  });
});
