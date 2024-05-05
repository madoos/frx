import { Observable, Operator } from '../types';
import { identity } from './identity';

/**
 * Applies the provided operator to the input observable.
 */
export const applyTo = <I, O>(src: Observable<I>, operator: Operator<I, O>) =>
  operator(src);

/**
 * Composes two operators together to create a new operator that applies both sequentially.
 */
export const pipe2 =
  <A, B, C>(op1: Operator<A, B>, op2: Operator<B, C>): Operator<A, C> =>
  (src: Observable<A>): Observable<C> => {
    return op2(op1(src));
  };

/**
 * Composes multiple operators together to create a new operator that applies them sequentially.
 */
export const pipe: {
  <A, B>(op1: Operator<A, B>): Operator<A, B>;
  <A, B, C>(op1: Operator<A, B>, op2: Operator<B, C>): Operator<A, C>;
  <A, B, C, D>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>
  ): Operator<A, D>;
  <A, B, C, D, E>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>,
    op4: Operator<D, E>
  ): Operator<A, E>;
} = (...operators: Operator<unknown, unknown>[]) => {
  return operators.reduce(pipe2, identity);
};
