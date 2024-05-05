import { Observable } from '../types';

/**
 * Creates a higher-order operator that combines multiple observables into one based on a monoidal operator function.
 */
export const fold = (
  identity: Observable<unknown>,
  binaryOperator: <A, B>(
    src1: Observable<A>,
    src2: Observable<B>
  ) => Observable<A | B>
) => {
  const operator: {
    <A, B>(src1: Observable<A>, src2: Observable<B>): Observable<A | B>;
    <A, B, C>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>
    ): Observable<A | B | C>;
    <A, B, C, D>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>,
      src4: Observable<D>
    ): Observable<A | B | C | D>;
    <A, B, C, D, E>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>,
      src4: Observable<D>,
      src5: Observable<E>
    ): Observable<A | B | C | D | E>;
    <A, B, C, D, E, F>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>,
      src4: Observable<D>,
      src5: Observable<E>,
      src6: Observable<F>
    ): Observable<A | B | C | D | E | F>;
    <A, B, C, D, E, F, G>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>,
      src4: Observable<D>,
      src5: Observable<E>,
      src6: Observable<F>,
      src7: Observable<G>
    ): Observable<A | B | C | D | E | F | G>;
    <A, B, C, D, E, F, G, H>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>,
      src4: Observable<D>,
      src5: Observable<E>,
      src6: Observable<F>,
      src7: Observable<G>,
      src8: Observable<H>
    ): Observable<A | B | C | D | E | F | G | H>;
    <A, B, C, D, E, F, G, H, I>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>,
      src4: Observable<D>,
      src5: Observable<E>,
      src6: Observable<F>,
      src7: Observable<G>,
      src8: Observable<H>,
      src9: Observable<I>
    ): Observable<A | B | C | D | E | F | G | H | I>;
    <A, B, C, D, E, F, G, H, I, J>(
      src1: Observable<A>,
      src2: Observable<B>,
      src3: Observable<C>,
      src4: Observable<D>,
      src5: Observable<E>,
      src6: Observable<F>,
      src7: Observable<G>,
      src8: Observable<H>,
      src9: Observable<I>,
      src10: Observable<J>
    ): Observable<A | B | C | D | E | F | G | H | I | J>;
  } = (...all: Observable<unknown>[]) => all.reduce(binaryOperator, identity);

  return operator;
};
