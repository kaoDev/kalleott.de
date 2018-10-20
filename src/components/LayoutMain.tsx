import styled from 'react-emotion'
import { heights } from '../styles/variables'

export const LayoutMain = styled.main({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  alignItems: 'center',
  paddingTop: `${heights.header}px`,
})
