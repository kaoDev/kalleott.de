import styled from 'react-emotion'
import { colors } from '../styles/variables'
import { textShadow, px } from '../styles/utils'

export const SiteTitle = styled.h1({
  fontSize: px(60),
  marginBottom: px(60),
  textAlign: 'center',
  fontWeight: 400,
  textShadow: textShadow(5, colors.accent),
})
