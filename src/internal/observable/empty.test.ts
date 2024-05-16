import { empty } from './empty';
import { marble } from '../testing';

describe('observable/empty', () => {
  test(
    'should not emit values',
    marble(({ expectObservable }) => {
      expectObservable(empty).toBe('|');
    })
  );
});
