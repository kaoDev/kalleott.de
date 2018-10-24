import React from 'react'
import styled, { css } from 'react-emotion'
import { px } from '../styles/utils'
import { dimensions, colors, titleTiltDegree } from '../styles/variables'
import { Link } from './Link'
import { courseData as webCourse } from '../courses/project-webapp'
import { courseData as iotCourse } from '../courses/iot'
import { GatsbyLinkProps } from 'gatsby'

const HiddenInput = styled.input({
  display: 'block',
  width: px(dimensions.base * 5),
  height: px(dimensions.base * 4),
  position: 'absolute',
  top: px(-7),
  left: px(-5),
  cursor: 'pointer',
  opacity: 0,
  zIndex: 20,
  '-webkit-touch-callout': 'none',
})

const BurgerMenuStripe = styled.div({
  width: px(33),
  height: px(4),
  marginBottom: px(5),
  position: 'relative',
  background: colors.accent,
  borderRadius: px(3),
  zIndex: 10,
  transformOrigin: `${px(4)} ${px(0)}`,
  transition: [
    'transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0)',
    'background 0.5s cubic-bezier(0.77,0.2,0.05,1.0)',
    'opacity 0.55s ease',
  ].join(', '),
  [':first-child']: {
    transformOrigin: '0% 0%',
  },
  [':nth-last-child(2)']: {
    transformOrigin: '0% 100%',
  },
})

const MenuList = styled.ul({
  position: 'absolute',
  width: `calc(100% + ${px(dimensions.base * 16)})`,
  top: px(dimensions.base * -3),
  left: px(dimensions.base * -10),
  padding: px(dimensions.base * 9),
  background: colors.dark,
  listStyleType: 'none',
  transformOrigin: '0% 0%',
  transform: `rotate(${titleTiltDegree}deg) translate(-100%, 0)`,
  transition: 'transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0)',
})

const MenuWrapper = styled.div({
  position: 'relative',
  zIndex: 10,
  userSelect: 'none',
  [`${HiddenInput}:checked ~ ${BurgerMenuStripe}`]: {
    opacity: 1,
    transform: 'rotate(45deg) translate(-2px, -1px)',
    background: colors.light,
  },
  [`${HiddenInput}:checked ~ ${BurgerMenuStripe}:nth-last-child(3)`]: {
    opacity: 0,
    transform: 'rotate(0deg) scale(0.2, 0.2)',
  },
  [`${HiddenInput}:checked ~ ${BurgerMenuStripe}:nth-last-child(2)`]: {
    transform: 'rotate(-45deg) translate(0, -1px)',
  },
  [`${HiddenInput}:checked ~ ${MenuList}`]: {
    transform: `rotate(${titleTiltDegree}deg) translate(0%, 0)`,
  },
})

const activeNavClass = css({})

const MenuItem = styled.li({
  paddingTop: px(dimensions.base),
  color: colors.light,
  fontSize: px(dimensions.base * 4),
})

const MenuSubItem = styled.li({
  padding: `${px(dimensions.base * 0.25)} 0`,
  paddingLeft: px(dimensions.base * 3),
  fontSize: px(dimensions.base * 3),
  color: colors.light,
})

const StyledLink = styled(Link)({
  display: 'block',
  transition: 'text-decoration-color 0s',
  height: '100%',
  marginRight: px(dimensions.containerPadding),
  [`&${activeNavClass}`]: {
    textDecorationColor: colors.accent,
  },
})

const NavLink = ({
  ref,
  innerRef,
  sub,
  ...props
}: GatsbyLinkProps<any> & { sub: boolean }) => (
  <StyledLink activeClassName={activeNavClass} {...props}>
    {sub ? (
      <MenuSubItem>{props.children}</MenuSubItem>
    ) : (
      <MenuItem>{props.children}</MenuItem>
    )}
  </StyledLink>
)

const BackgroundClickMenuHider = styled.div<{ active: boolean }>(
  {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    background: colors.dark,
  },
  ({ active }) => ({
    zIndex: active ? 1 : -10,
    opacity: 0.05,
  })
)

const links = [
  {
    label: 'Home',
    slug: '/',
    isSub: false,
  },
  {
    label: 'Courses',
    slug: '/courses',
    isSub: false,
  },
  {
    label: webCourse.title,
    slug: webCourse.slug,
    isSub: true,
  },
  {
    label: iotCourse.title,
    slug: iotCourse.slug,
    isSub: true,
  },
]

interface State {
  visible: boolean
}

export class Menu extends React.Component<{}, State> {
  state: State = {
    visible: false,
  }

  toggleVisible = () => {
    this.setState(state => ({ visible: !state.visible }))
  }
  hideMenu = () => {
    this.setState({ visible: false })
  }

  render() {
    const { visible } = this.state

    return (
      <nav role="navigation">
        <BackgroundClickMenuHider active={visible} onClick={this.hideMenu} />
        <MenuWrapper>
          <HiddenInput
            onChange={this.toggleVisible}
            checked={visible}
            type="checkbox"
          />

          <BurgerMenuStripe />
          <BurgerMenuStripe />
          <BurgerMenuStripe />

          <MenuList id="menu">
            {links.map(({ label, isSub, slug }) => (
              <NavLink onClick={this.hideMenu} to={slug} key={slug} sub={isSub}>
                {label}
              </NavLink>
            ))}
          </MenuList>
        </MenuWrapper>
      </nav>
    )
  }
}
