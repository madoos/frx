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
