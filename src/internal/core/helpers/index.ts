export const noop = <T = void>(_x?: T): void => undefined;

export const tryCatch = <O>(
  f: () => O,
  handler: (e: any) => any,
  value: O
): O => {
  try {
    return f();
  } catch (e: any) {
    handler(e);
    return value;
  }
};

export const isPromise = (x: any): x is Promise<any> => {
  return x !== null && typeof x === 'object' && typeof x.then === 'function';
};

export const isIterable = (x: any): x is Iterable<any> => {
  return (
    x !== null &&
    typeof x === 'object' &&
    typeof x[Symbol.iterator] === 'function'
  );
};

export const isString = (x: any): x is string => {
  return typeof x === 'string';
};
