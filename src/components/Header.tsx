import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Link, GatsbyLinkProps } from 'gatsby'

import { heights, dimensions, colors } from '../styles/variables'
import { Container } from './Container'
import { px } from '../styles/utils'

const StyledHeader = styled.header({
  height: `${heights.header}px`,
  background: colors.dark,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  zIndex: 10,
})

const HeaderInner = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
  padding: `0 ${px(dimensions.containerPadding)}`,
})

const NavLinkWrapper = styled.li({
  display: 'flex',
})

const NavLinkLabel = styled.div({
  color: colors.light,
  fontWeight: 'bolder',
  fontSize: px(dimensions.headingSizes.h3),
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
})

const StyledLink = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  textShadow: `-2px 2px 0px ${colors.accent}`,
  ['&:hover, &:focus']: {
    textDecoration: 'none',
    [`${NavLinkLabel}`]: {
      textShadow: `-2px 2px 0px ${colors.accent2}`,
    },
  },
  height: '100%',
  minWidth: px(100),
})

const activeNavClass = css({
  [`${NavLinkLabel}`]: {
    textShadow: `-2px 2px 0px ${colors.accent}`,
  },
})

const NavLink = ({ ref, innerRef, ...props }: GatsbyLinkProps<any>) => (
  <NavLinkWrapper>
    <StyledLink activeClassName={activeNavClass} {...props}>
      <NavLinkLabel>{props.children}</NavLinkLabel>
    </StyledLink>
  </NavLinkWrapper>
)

const LinkList = styled.ul({
  display: 'flex',
  gridGap: px(dimensions.base),
  margin: 0,
  width: '100%',
  height: '100%',
  padding: 0,
})

interface HeaderProps {
  title: string
}

export const Header: React.SFC<HeaderProps> = () => (
  <StyledHeader>
    <HeaderInner>
      <nav>
        <LinkList>
          <NavLink to="/">KO</NavLink>
          <NavLink to="/project-webapp">Project WebApp</NavLink>
          <NavLink to="/iot">IoT</NavLink>
        </LinkList>
      </nav>
    </HeaderInner>
  </StyledHeader>
)
