import styled from 'react-emotion'
import { dimensions, widths } from '../styles/variables'
import { px } from '../styles/utils'

export const Page = styled.div({
  display: 'block',
  flex: 1,
  position: 'relative',
  padding: px(dimensions.containerPadding),
  marginBottom: px(6 * dimensions.base),
  width: '100%',
  maxWidth: `${widths.lg}px`,
})
