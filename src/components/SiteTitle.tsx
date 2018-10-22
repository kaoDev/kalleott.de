import React from 'react'
import styled from 'react-emotion'
import { colors, dimensions } from '../styles/variables'
import { textShadow, px } from '../styles/utils'

const SiteTitleText = styled.h1({
  fontSize: px(dimensions.base * 7),
  marginBottom: px(0),
  textAlign: 'center',
  fontWeight: 600,
  textShadow: textShadow(10, colors.dark),
  color: colors.light,
  width: 'auto',
  maxWidth: '50%',
  padding: '6px 8px 16px',
  borderBottom: '2px solid',
  borderTop: '2px solid',
})

const OuterWrapper = styled.div({
  marginBottom: px(dimensions.base * 6),
  marginTop: px(dimensions.base * 4),
  width: '200%',
  alignSelf: 'center',
  minHeight: px(dimensions.base * 20),
})
const TiltedWrapper = styled.div({
  transform: 'rotate(-7deg)',
  background: colors.accent,
  display: 'flex',
  justifyContent: 'center',
  padding: px(dimensions.base * 2),
})

export const SiteTitle: React.SFC = props => (
  <OuterWrapper>
    <TiltedWrapper>
      <SiteTitleText>{props.children}</SiteTitleText>
    </TiltedWrapper>
  </OuterWrapper>
)
