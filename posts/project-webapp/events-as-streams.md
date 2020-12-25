---
title:
  Project WebApp — Taking control over
  state-changes
date: "2018-05-22T06:53:03.284Z"
course: Project WebApp
---

As already said in last session, besides handling
the state itself it is very important to take care
of the state changes. An extremely powerful tool
for this is
[RXJS](https://github.com/reactivex/rxjs). It
works with the concept of observables, which are
sources of data you can subscribe on.

The rxjs lib provides many defaults to create
useful observables for example the interval
function creates an observable triggered every
time the given amount of milliseconds passes.

```js
import { interval } from "rxjs";

// Create an Observable that will publish a value on an interval
const secondsCounter = interval(1000);
// Subscribe to begin publishing values
secondsCounter.subscribe((n) =>
  console.log(
    `It's been ${n} seconds since subscribing!`
  )
);
```

Important to know here is, that the observable is
only active as long as there is an active
subscription. So you can declare the complete
dataflow and trigger it by subscribing. This is
also meaningful for ajax requests, the request is
only triggered when there is someone who listens
for the result.

```js
import { ajax } from "rxjs/ajax";

const requestLuke = ajax(
  "https://swapi.co/api/people/1"
);
// nothing happens here
```

```js
import { ajax } from "rxjs/ajax";

const requestLuke = ajax(
  "https://swapi.co/api/people/1"
);

const sub = requestLuke.subscribe((res) => {
  console.log(res.status, res.response);
});
// now the actual api call is fired
```

The real power of rxjs lies in its operators which
can transform the data coming from an observable
and build a new observable providing the
transformed data. The most important one is the
map-operator, which returns a new value for each
value passing through. In general, it can be seen
as a stream of information passing through a pipe
with all sorts of valves/filters/transformers...
and so the function to work with the operators has
the fitting name `pipe`. A simple `map` example is
to transform the ajax-response object to the
actual response object.

```js
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

const requestLuke = ajax(
  "https://swapi.co/api/people/1"
).pipe(map((res) => res.response));

const sub = requestLuke.subscribe((response) => {
  console.log(response);
});
```

And to catch possible errors (handling with
external services can always cause errors) use the
`catchError` operator.

```js
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { empty } from "rxjs";

const requestLuke = ajax(
  "https://swapi.co/api/people/1"
).pipe(
  catchError((e) => {
    console.error(e);
    // simple fallback of returning an empty observable
    // (swallows error -> bad error catching)
    return empty();
  }),
  map((res) => res.response)
);

const sub = requestLuke.subscribe((response) => {
  console.log(response);
});
```

A list of all operators and observable factories
can be found on the official docs site
[reactivex.io/rxjs](http://reactivex.io/rxjs).

Besides the given Observable factories there are
also "Subjects", a subject in the rxjs context is
an observable, with the addition of the `.next()`
method. By calling next with a value you can push
this value in the observable pipeline. But
remember, the provided values are only digested
when there is a subscriber. All calls to next
before there is an active subscription are simply
forgotten.

```js
import { Subject } from "rxjs";
const eventsProvider = new Subject();
eventsProvider.next("first event"); // this is forgotten

const sub = eventsProvider.subscribe(
  (response) => {
    console.log(response);
  }
);
eventsProvider.next("second event"); // gets logged to console
```

For the chat app from the last session this means
you can declare all changes to the state with
observables and user inputs with subjects.

```js
import { Subject, from } from "rxjs";
import {
  Subject,
  merge,
  scan,
} from "rxjs/operators";

const messageInputSubject = new Subject();
const initialMessages = from(messagesJson);

const messageStream = messageInputSubject.pipe(
  merge(messagesJson)
);

// observable providing an array of all messages
const messageState = messageStream.pipe(
  // scan acts like reduce, but over time.
  // it always provides the last calculated value
  scan(
    (state, message) => {
      return state.concat(message);
    },
    // empty array as initial value
    []
  )
);
```

To connect this state with the react world a
subscription on the relevant data is needed in one
component which transfers the rxjs-state into the
react-world. When building a subscription it is
important to unsubscribe, when it's not used
anymore to prevent memory-leaks. You can either
use a direct `.unsubscribe()` call on the
subscription object, or use the
`takeUntil(someObservable)` operator. The
`subscribe` call should be in the
`componentDidMount` react lifecycle method, and
end of the subscription should be in the
`componentWillUnmount` lifecycle method. More
information about the react-component lifecycle
can be found
[here](https://reactjs.org/docs/react-component.html#the-component-lifecycle).

```jsx
export class App extends React.Component {
  // initial state
  state = {
    /* ✂️ */
  };

  // subject which emits on componentWillUnmount
  unMounted = new Subject();

  // react lifecycle method called when this
  // component got mounted into the DOM
  componentDidMount() {
    stateObservable
      .pipe(
        /* other transforamtions ✂️ */
        takeUntil(this.unMounted)
      )
      .subscribe((stateUpdate) => {
        this.setState(stateUpdate);
      });
  }

  // react lifecycle method called when this
  // component will be removed from the DOM
  componentWillUnmount() {
    this.unMounted.next();
  }

  render() {
    /* ✂️ */
  }
}
```

### Tasks

- clone the
  [chat-app-2 repository](https://github.com/kaoDev/chat-app-2)
- install the rxjs dependency `npm install rxjs`
- create a folder "state" in the project to
  separate state-handling code
- create the message- and user-observables and
  subjects needed to manage all data hold in the
  state
- connect the app with the newly create
  state-logic
- extend the state with an observable to calculate
  the message count
- (bonus) add second input field to select a user
  and filter the messages to show only messages
  from this user
