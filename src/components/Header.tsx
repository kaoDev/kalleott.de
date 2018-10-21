import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Link, GatsbyLinkProps } from 'gatsby'

import { heights, dimensions, colors } from '../styles/variables'
import { Container } from './Container'
import { px, textShadow } from '../styles/utils'

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

const activeNavClass = css({})
const StyledLink = styled(Link)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'text-decoration-color 0s',
  ['&:hover, &:focus']: {
    [`${NavLinkLabel}`]: {
      textShadow: textShadow(2, colors.accent),
    },
  },
  height: '100%',
  marginRight: px(dimensions.containerPadding),
  [`&.${activeNavClass}`]: {
    textDecorationColor: colors.accent,
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
          <NavLink to="/courses">Courses</NavLink>
        </LinkList>
      </nav>
    </HeaderInner>
  </StyledHeader>
)
