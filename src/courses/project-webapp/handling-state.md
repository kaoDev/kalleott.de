---
title: State management in a react app
date: '2018-05-15T06:53:03.284Z'
course: Project WebApp
---

Handling the state of an application is one of the core
features of most frameworks and even react ha a build in
state API. Every class-bases component has its own state
which can be accessed with the class property `state`. The
initial value can be set when a new instance of the class is
built. But for every state update you should use the
component method `setState` because mutating the state
directly won't trigger an update in the react component
tree. `setState` can either be called with an object
containing the new state properties or with a function which
gets the current state and props as parameters. By calling
it with a function you can be sure to get actual state at
the time of the state update. The simpler call with just a
new state object works most of the times, but with many
state updates in a short time it can come to race conditions
because React can execute multiple state updates before a
new render occurs.

Here is a small hello-state example of storing a number and
increment or decrement it with buttons:

<component-playground complex="true" sample="HelloState.js" ></component-playground>
One of the most important rules of state management is:

### <center>Your Data Should Be Immutable</center>

All data in the state should be treated as read only,
changes are made by creating new objects and dispatching
them as state updates. For objects this means, whenever a
property of an object changes you create a new object. And
Whenever elements of an array change, you create a new
array. Sticking to these rules makes it very easy to
determine if a component should update because only the
references of the objects must be compared.

Even more important:

### <center>There Must Only Be One Single Source Of Truth</center>

Don't create multiple local states managing the same data,
whenever the state of a component is needed somewhere else
leverage it up to the parent component until every component
depending on this state is located under the state-holder in
the component tree.

This allows you to derive multiple different interpretations of
a single state and whenever this state gets an updated,
every derivation is calculated with the new state.

## Managing the updates

For most cases the `setState` method alone is enough, but
when the state gets a little more complex and state updates
can come from many different parts of the application it is
useful to build a more consistent way to update single parts
of the state. One powerful but simple tool is the
[redux-pattern](https://redux.js.org/). With redux, you
dispatch actions instead of calling `setState` directly with
the updated values. Those actions are then digested by
functions called `reducers` which create the new state.

<component-playground complex="true" sample="HelloRedux.js" ></component-playground>

With this pattern it is easy to separate the state
management from the UI code and because you are describing
the changes with actions instead of direct updates it is
easy to extend the model with new properties derived from
the already defined actions

<component-playground complex="true" sample="HelloReduxExtended.js" ></component-playground>

### Tasks

- clone the
  [chat-app-1](https://github.com/kaoDev/chat-app-1)
  repository and start the dev-server (`npm start`) (or
  continue with your own design from last session)
- Define a state structure for the users and messages hold
  in the App component
- Add a new component to enable a user to compose and submit
  a new message
- Define an update mechanism to handle new messages coming
  from the message input component
