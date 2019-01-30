import React from 'react'
import styled from 'react-emotion'
import { dimensions, widths, colors } from '../styles/variables'
import { px } from '../styles/utils'
import { Menu } from './Menu'

const PageWrapper = styled.div({
  display: 'block',
  flex: 1,
  position: 'relative',
  padding: px(dimensions.containerPadding),
  marginBottom: px(6 * dimensions.base),
  width: '100%',
  maxWidth: `${widths.lg}px`,
  boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  background: colors.light,
})

export const Page: React.FC = props => (
  <PageWrapper>
    <Menu />
    {props.children}
  </PageWrapper>
)
