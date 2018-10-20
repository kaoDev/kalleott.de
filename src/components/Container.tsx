import styled from 'react-emotion'

import { widths } from '../styles/variables'

export const Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: `${widths.lg}px`,
  width: '100%',
})
