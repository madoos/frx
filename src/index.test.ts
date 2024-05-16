import * as api from '.';
import * as interopApi from './interop';
import * as observableApi from './observable';
import * as operatorsApi from './operators';
import * as schedulerApi from './scheduler';

describe('public api', () => {
  test('should expose public index api', () => {
    expect(Object.keys(api)).toEqual([
      'observable',
      'empty',
      'fromIterable',
      'fromPromise',
      'from',
      'interval',
      'timer',
      'asyncScheduler',
      'applyTo',
      'pipe2',
      'pipe',
      'identity',
      'map',
      'tap',
      'catchError',
      'concat',
    ]);
  });

  test('should expose interop public api', () => {
    expect(Object.keys(interopApi)).toEqual(['from', 'to']);
  });

  test('should expose observable public api', () => {
    expect(Object.keys(observableApi)).toEqual([
      'observable',
      'empty',
      'fromIterable',
      'fromPromise',
      'from',
      'interval',
      'timer',
    ]);
  });

  test('should expose operators public api', () => {
    expect(Object.keys(operatorsApi)).toEqual([
      'applyTo',
      'pipe2',
      'pipe',
      'identity',
      'map',
      'tap',
      'catchError',
      'concat',
    ]);
  });

  test('should expose schedulers public api', () => {
    expect(Object.keys(schedulerApi)).toEqual(['asyncScheduler']);
  });
});
