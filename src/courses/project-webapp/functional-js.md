---
title: Functional programming with JavaScript
date: '2018-04-17T06:53:03.284Z'
course: Project WebApp
---

as the name "functional programming" suggests, this lesson
has a heavy focus on functions. In JavaScript you can
describe a function in several ways:

- with the `function` keyword:

```js
function func(params){
  ...doSomething...
  return result
}
```

- as a method (same behavior as the function keyword):

```js
const methodHolder = {
  func(params){
    ...doSomething...
    return result
  }
}
```

- store it as an anonymous function in a variable

```js
const func = function(params) {
  ...doSomething...
  return result
}
```

- and the best part: define it as an arrow function

```js
const func = (params) => {
  ...doSomething...
  return result
}
```

Arrow functions have some benefits over the classical
function/method declaration.

1.  the `this` context gets set at the time of definition
2.  it's a little bit shorter to write (with only one
    parameter you can even omit the parentheses)

#### A short excursion on why `this` is weird in JS:

In the programming model of JavaScript it is totally fine to
redefine the owner of a function when you call it, so
whenever you use `this`, you have to make sure that the
context is set correctly when you call the function.

A short example:

```js
var person = {
  name: 'Clara',
  greet() {
    return 'Hello ' + this.name
  },
}
person.greet() // -> 'Hello Clara'

var greet = person.greet
greet() // -> 'Hello '

greet.call({ name: 'Peter' }) // -> 'Hello Peter'
greet.call({ noPerson: 500 }) // -> 'Hello undefined'
```

To solve this, like always, you have several possible ways
to go.

1.  Avoid this-context by using direct access to the owning
    object **(BAD)**

```js
var person = {
  name: 'Clara',
  greet() {
    return 'Hello ' + person.name
  },
}
person.greet() // -> 'Hello Clara'

var greet = person.greet
greet() // -> 'Hello Clara'

greet.call({ name: 'Peter' }) // -> 'Hello Clara'
greet.call({ noPerson: 500 }) // -> 'Hello Clara'
```

2.  Use a class and arrow-function for a fixed this-context:

```js
class Person {
  constructor(name) {
    this.name = name
    this.greet = () => 'Hello ' + this.name
  }
}
var person = new Person('Lotte')
person.greet() // -> 'Hello Lotte'
var greet = person.greet
greet() // -> 'Hello Lotte'

greet.call({ name: 'Peter' }) // -> 'Hello Lotte'
greet.call({ noPerson: 500 }) // -> 'Hello Lotte'
```

3.  Go functional and use an independent greeting function

```js
const greet = name => 'Hello ' + name
greet('Bert') // -> 'Hello Bert'
```

The lesson-learned should be, only use `this` if you really
have to, when possible use pure functions.

Now back to functional programming.

One fundamental building block is the usage of
["pure" functions](https://en.wikipedia.org/wiki/Pure_function),
this definition is close to the mathematical definition of
functions `f(x) -> y`. A pure function returns a value
purely defined by the parameters passed into it, and there
should be no dependencies to variables defined outside of
the function's scope. The returned value is also always the
same if the passed parameters are the same (no randomness or
hold state in the function). Besides calculating the
resulting value the function has no other effects. So never
ever mutate the incoming values.

<style>
  .pure, .impure {
    position: relative;
  }

  .pure:hover::before, .impure:hover::before {
    color: rgba(255,255,255,0.8);
    width: auto;
    position: absolute;
    padding: 0 10px;
    left: calc(100% + 14px);
  }
  .pure:hover::before {
    content: "pure";
    background-color: #0aa510;

  }
  .impure:hover::before {
    content: "impure";
    background-color: #a50a10;
  }
</style>

- <span class="pure">pure or impure?</span>

```js
function f(x, y) {
  return x + y
}
```

- <span class="impure">pure or impure?</span>

```js
let count = 0
function f(x, y) {
  count++
  return x + y
}
```

- <span class="pure">pure or impure?</span>

```js
const f = (x, y) => x + y
```

- <span class="impure">pure or impure?</span>

```js
const y = 2
const f = x => x + y
```

- <span class="pure">pure or impure?</span>

```js
const f = x => x + 2
```

- <span class="impure">pure or impure?</span>

```js
const f = (x, y) => {
  console.log(x, y)
  return x + y
}
```

Another very important paradigm in functional programming is
["declarative programming"](https://en.wikipedia.org/wiki/Declarative_programming).
Instead of describing the control flow of the program you
should care about the logic and behavior. For example use
recursion instead of loops.

### Task

- write a pure and declarative function calculating of the
  fibonacci sequence as a start use this imperative and
  impure implementation:

```js
let a, b, temp
const fibonacci = num => {
  a = 1
  b = 0
  while (num >= 0) {
    temp = a
    a = a + b
    b = temp
    num--
  }

  return b
}
```

Here is a codesandbox with tests to work on this in the
browser:
[Edit Fibonacci](https://codesandbox.io/s/jlkz27yyk5)

[solution](https://codesandbox.io/s/j4ql17vzp5)

## Passing functions around

The parameters passed into a function can be data, like
numbers, booleans, strings, objects... and also functions.
So you can call a function with a function. Even the
returned value can be a function.

![yo dawg](./yo-dawg.jpg)

Functions taking other functions as arguments or returning
functions are called
["higher-order-functions"](https://en.wikipedia.org/wiki/Higher-order_function)

Getting back to the greeting function, this pattern allows
you to define a function to return a function to generate a
greeting message for a specific name.

```js
const generateGreetingFunction = name => {
  return () => 'Hello ' + name
}
const greetDavid = generateGreetingFunction('David')
greetDavid() // -> 'Hello David'
```

or in a shorter way:

```js
const generateGreetingFunctionShort = name => () => 'Hello ' + name
```

The most commonly used higher-order-functions in JS are
array-functions like
[`forEach`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/foreach),
[`filter`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
[`map`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
and
[`reduce`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
Those functions take a function as input and call this
function with every element of the array.

Examples:

```js
const array = [1, 2, 3, 4, 5]

array.map(num => num * 2) // -> [2, 4, 6, 8, 10]

array.filter(num => num % 2 === 0) // [2, 4]

array.reduce((accumulator, currentValue) => accumulator + currentValue, 0) // -> 15
```

But because normally you don't develop just for the matter
of programming, here is a reason why you should care about
all this: It is a powerful tool to handle and transform
data. So it is very useful if you are working in any field
were you have some larger datasets. In this course we will
use it to transform data into UI.

But first some exercises. As a training data set you can use
the data from [the Star Wars API](https://swapi.co/)
provided in the code-sandbox.

Here is an example how to get the names from all residents
of Tatooine:

```js
const tatooineResidents = people
  .filter(person => {
    return planets.some(
      planet => planet.id === person.homeworld && planet.name === 'Tatooine'
    )
  })
  .map(person => person.name)
```

[Edit Star Wars API - data transform exercises](https://codesandbox.io/s/pwvxzw025j)

### Tasks:

- get familiar with the
  [array functions](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array)
- get all starships with a hyperdrive rating over 2 which
  appear in the movie "A new Hope"
- are there any transports capable of carrying more than 8
  passengers which are cheaper than 400000 credits
- how fast is the TIE bomber?
- how many characters are listed for the movie "The Phantom
  Menace"?
- list all the characters from the movie "Revenge of the
  Sith" matched to their species
- what is the longest opening crawl of all movies?

[solution](https://codesandbox.io/s/xyxw87v1o)
