# Usage

## Creation

* observable

### observable

Allow create a custom observable

```ts
import { observable } from '@madoos/frx';

const custom = observable<string, never>((next, error, complete) => {
  next(1);
  complete();
  return () => {};
});

custom(
  one => console.log(one),
  e => console.error(e),
  () => console.log('Completed!')
);

```