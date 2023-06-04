# @madoos/frx

@madoos/frx is a reactive functional programming library that allows you to create composable data streams, similar to RxJS. Its main difference lies in its functional approach to construction. In very simple terms, we can think of observables as functions that can be composed. This library eliminates the use of classes and solely relies on functions to create observables, observers, schedulers, and subscriptions. The end result is a composed function that operates as an observable.

## Features
* Functional programming approach: @madoos/frx emphasizes a functional programming paradigm, providing a more functional way to work with data streams.
* Composable data streams: With @madoos/frx, you can easily compose data streams by chaining together functions.
* No classes: This library avoids the use of classes and focuses solely on using functions for creating observables, observers, schedulers, and subscriptions.
* Lightweight: @madoos/frx is designed to be lightweight and minimalistic, providing only the necessary functionality for working with data streams.

## Installation

You can install @madoos/frx using npm or yarn:

```bash
npm install @madoos/frx
```

```bash
yarn add @madoos/frx
```

## Usage
Here's a basic example demonstrating how to create and compose data streams using @madoos/frx:

```ts
import { observable, map, scan, pipe } from '@madoos/frx';

const numbers = observable<number, never>((next, error, complete) => {
    let n = 1;
    next(n++)
    const id = setInterval(() => next(n++), 1000);
    return () => clearInterval(id)
});

const operator = pipe(
    map(n => n * 2),
    scan((total, n) => total + n, 0)
)

const result = operator(numbers);


const unsubscribe = result(
    (n) => console.log(n),
    (e) => console.error(e),
    () => console.log('Completed!')
);

setTimeout(unsubscribe, 10000)

```