# Usage

## Creation

* observable 
* from

## observable
Allows defining a custom observable.

```ts
import { observable } from '@madoos/frx';

const custom = observable<string, never>((next, error, complete) => {
  next(0);
  next(1);
  next(2);
  complete();
  return () => {};
});


custom(
  n => console.log(n),
  e => console.error(e),
  () => console.log('Completed!')
);
```

## from
Allows transforming any iterable into an observable.
 
```ts
import { from } from '@madoos/frx/creation';

const numbers = from([1, 2, 3]);

numbers(
  n => console.log(n),
  e => console.error(e),
  () => console.log('Completed!')
);

```