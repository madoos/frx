import { identity } from './identity';
import { marble } from '../testing';

describe('operators/identity', () => {
  it(
    'should return the input observable as is',
    marble(({ cold, expectObservable }) => {
      const values = { a: 1, b: 2, c: 3 };
      const src = cold('a-b-c-|', values);
      const result = identity(src);
      expectObservable(result).toBe('a-b-c-|', values);
    })
  );
});
