import { Observable } from '../types';
/**
 * Returns the input observable as is, acting as an identity function.
 */
export const identity = <T>(src: Observable<T>) => src;
