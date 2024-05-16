import { merge } from './merge';
import { marble } from '../testing';

describe('Operators/merge', () => {
  it(
    'should merge multiple observables',
    marble(({ cold, expectObservable }) => {
      const src1 = cold('a--c-|');
      const src2 = cold('-b--d-|');
      const src3 = cold('-------e-|');
      const merged = merge(src1, src2, src3);
      expectObservable(merged).toBe('ab-cd--e-|');
    })
  );

  it(
    'should stop when an error occurs',
    marble(({ cold, expectObservable }) => {
      const src1 = cold('a--c-|');
      const src2 = cold('-b--d--#');
      const src3 = cold('-------e-|');
      const merged = merge(src1, src2, src3);
      expectObservable(merged).toBe('ab-cd--#');
    })
  );
});
