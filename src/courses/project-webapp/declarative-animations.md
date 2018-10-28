---
title: Declarative animations with react-pose
date: '2018-06-12T06:53:03.284Z'
course: Project WebApp
---

In general animating the view is hard, because suddenly the
state is dependent on time. Views can exist longer than they
existed before because of exit animations, or some layouts
must wait for other elements to take their place. And
animations are expensive, so don't do too much and whenever
possible you should use hardware accelerated key-frame
animations or transitions. But sometimes the animations get
a little more complex and are difficult to handle with pure
CSS and style rules. Then it's time to take some animation
library to help.

One of the large goals of react is to describe as much of
the app in a declarative way, for styling the
styled-components workflow is working really good and
[react-pose](https://popmotion.io/pose/api/posegroup/) has a
similar API to animate components. Instead of styles you
define different "poses" the component can have and define
how the transitions of values between the poses should work.

For example a sidebar component which can be hidden on the
left side of the screen would look like this:

```jsx
import posed from 'react-pose'

const Sidebar = posed.nav({
  open: {
    x: '0%',
    // animate child components with 100ms between entries
    staggerChildren: 100,
  },
  closed: { x: '-100%' },
})

const NavItem = posed.li({
  open: { opacity: 1 },
  closed: { opacity: 0 },
})

export default ({ isOpen, navItems }) => (
  <Sidebar pose={isOpen ? 'open' : 'closed'}>
    <ul>
      {navItems.map(({ url, name }) => (
        <NavItem>
          <a href={url}>{name}</a>
        </NavItem>
      ))}
    </ul>
  </Sidebar>
)
```

<iframe height="447" scrolling="no" title="" src="https://codepen.io/popmotion/embed/MVQepE/?height=447&amp;theme-id=17364&amp;default-tab=result&amp;embed-version=2" frameborder="no" allowtransparency="true" allowfullscreen="" style="width: 100%;"></iframe>

If you want to have enter and exit animations you need a
Wrapper Component managing newly created and disappearing
components. With react-pose you can use the `PoseGroup` to
manage posed components. Every direct child of a PoseGroup
will get the poses `enter` and `exit` and needs a unique
`key` prop to enabled tracking of the elements.

```jsx
const Item = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
})

const ItemList = ({ items }) => (
  <PoseGroup>
    {items.map(item => (
      <Item key={item.id} />
    ))}
  </PoseGroup>
)
```

As an exercise try to rebuild
[this animation from dribble](https://dribbble.com/shots/2389505-Cards-Menu-Concept),
a working result could look like this:

`video: https://youtu.be/I2GP172Ov88`

You can use
[this repository](https://github.com/kaoDev/cards-menu-concept)
as a basis.

## Tasks

- identify all moving elements in the dribble design
- define poses for all UI states
- define transitions for all pose changes
