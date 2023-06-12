# Usage

## Creation

* observable
* from
* empty

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

### from

1. This creator can be used to convert arrays and iterables, all contained values will be emitted as a sequence.
3. This creator can also be used to emit a string as a sequence of characters.
2. This creator can be used to convert a promise to an observable.


From Iterable:
```ts
import { from } from '@madoos/frx/creation';

const numbers = from([1, 2, 3]);

numbers(
  n => console.log(n),
  e => console.log(e),
  () => console.log('Completed')
);
```

From String:
```ts
import { from } from '@madoos/frx/creation';

const letters = from('hello');

letters(
  l => console.log(l),
  e => console.log(e),
  () => console.log('Completed')
);
```

From Promise:
```ts
import { from } from '@madoos/frx/creation';

const num = from(new Promise(resolve => resolve(1));

num(
  n => console.log(n),
  e => console.log(e),
  () => console.log('Completed')
);
```

## empty

empty immediately completes.

```ts
import { empty } from '@madoos/frx/creation';

empty(
  console.log,
  console.error,
  () => console.log('Completed!')
);

```